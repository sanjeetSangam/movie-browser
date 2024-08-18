import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSearchedMovies } from "../api/movieDB";
import Filters from "../components/Filters";
import MovieList from "../components/MovieList";
import useStore from "../store/zustand";

interface Movie {
	id: number;
	poster_path: string;
	title: string;
}

interface SearchResultsProps {
	mode?: "search" | "favorites";
}

const Results: React.FC<SearchResultsProps> = ({ mode = "search" }) => {
	const { query } = useParams<{ query: string }>();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);

	// Filters
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [selectedLanguage, setSelectedLanguage] = useState<string>("");

	const { favorites } = useStore();

	const fetchMovies = async (page: number, append: boolean = false) => {
		if (mode === "favorites") {
			setMovies(favorites || []);
			setLoading(false);
			setHasMore(false);
		} else {
			try {
				append ? setLoadingMore(true) : setLoading(true);
				const data = await fetchSearchedMovies({
					query: query,
					include_adults: "false",
					language: selectedLanguage,
					page: String(page),
					primary_release_year: selectedYear,
					region: selectedRegion,
				});
				setMovies((prevMovies) =>
					append ? [...prevMovies, ...data.results] : data.results
				);
				setHasMore(data.results.length > 0);
			} catch (err: any) {
				setError(err.message);
			} finally {
				append ? setLoadingMore(false) : setLoading(false);
			}
		}
	};

	useEffect(() => {
		setMovies([]);
		setPage(1);
		fetchMovies(1, false);
	}, [query, selectedYear, selectedRegion, selectedLanguage, mode]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop + 100 >=
					document.documentElement.offsetHeight &&
				!loading &&
				hasMore
			) {
				setPage((prevPage) => prevPage + 1);
			}
		};

		if (mode !== "favorites") {
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [loading, hasMore, mode]);

	useEffect(() => {
		if (page > 1 && mode !== "favorites") {
			fetchMovies(page, true);
		}
	}, [page, mode]);

	return (
		<>
			{mode === "search" && (
				<Filters
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
					selectedRegion={selectedRegion}
					setSelectedRegion={setSelectedRegion}
					selectedLanguage={selectedLanguage}
					setSelectedLanguage={setSelectedLanguage}
				/>
			)}
			<div className={mode === "search" ? "" : "mt-[5rem]"}>
				<MovieList
					loading={loading}
					error={error}
					movies={movies}
					query={query || ""}
					loadingMore={loadingMore}
				/>
			</div>
		</>
	);
};

export default Results;
