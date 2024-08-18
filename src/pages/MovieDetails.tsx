export interface Genre {
	id: number | string;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

interface MovieDetails {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	} | null;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchSimilarMovies,
	image500,
	staticImage,
} from "../api/movieDB";
import FullscreenCard from "../components/FullscreenCard";
import SmallCard from "../components/SmallCard";
import { multipleItemsSettings } from "./Home";
import FullscreenCardSkeleton from "../components/skeletons/SkeletonFullscreenCard";
import SkeletonSmallCard from "../components/skeletons/SkeletonSmallCard";
import SkeletonCastCard from "../components/skeletons/SkeletonCastCard";

import { Avatar } from "flowbite-react";

export const castSettings: Settings = {
	dots: false,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 1,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 3000,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

const MovieDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [similarMovies, setSimilarMovies] = useState<MovieDetails[]>([]);
	const [cast, setCast] = useState<[]>([]);
	const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

	const fetchAllMovieData = async (id: string) => {
		try {
			const [details, credits, similar] = await Promise.all([
				fetchMovieDetails(id),
				fetchMovieCredits(id),
				fetchSimilarMovies(id),
			]);

			if (details) setMovieDetails(details);
			if (credits?.cast) setCast(credits.cast);
			if (similar?.results) setSimilarMovies(similar.results);
		} catch (error) {
			console.error("Error fetching movie data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const similarMoviesSlides = useMemo(
		() =>
			similarMovies.map((movie) => (
				<SmallCard
					key={movie.id}
					id={movie.id}
					poster_path={movie.poster_path}
					title={movie.title}
				/>
			)),
		[similarMovies]
	);

	useEffect(() => {
		if (id) fetchAllMovieData(id);
	}, [id]);

	if (isLoading)
		return (
			<main className="relative flex-1">
				<section className="movie-details-section">
					<FullscreenCardSkeleton />
				</section>

				<section className="details sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
					<div className="w-full h-4 bg-gray-400 rounded mb-2 animate-pulse"></div>
					<div className="w-3/4 h-8 bg-gray-400 rounded animate-pulse"></div>
				</section>

				<section className="casts sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
					<SkeletonCastCard />
				</section>

				<section className="similars sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
					<Slider {...multipleItemsSettings}>
						{Array(5)
							.fill(null)
							.map((_, index) => (
								<SkeletonSmallCard key={index} />
							))}
					</Slider>
				</section>
			</main>
		);

	if (!movieDetails) return <div>Movie details not found.</div>;

	return (
		<main className="relative flex-1">
			<section className="movie-details-section">
				<FullscreenCard
					backdrop_path={movieDetails.backdrop_path}
					title={movieDetails.title}
					release_date={movieDetails.release_date}
					overview={movieDetails.overview}
					genres={movieDetails.genres}
					runtime={movieDetails.runtime}
				/>
			</section>

			<section className="details sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
				<h2 className="title-1 highlight mb-3">Synopsis</h2>
				<p>{movieDetails.overview}</p>
			</section>

			<section className="casts sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
				<h2 className="mb-5 highlight title-1">Cast</h2>
				<div className="cast-details w-full">
					{cast?.length > 0 ? (
						<Slider {...castSettings}>
							{cast?.map((castDetails: any) => (
								<div
									key={castDetails?.id}
									className="!flex items-center gap-5 flex-1"
								>
									<Avatar
										rounded
										img={
											image500(castDetails.profile_path as string) ||
											staticImage
										}
									/>
									<div className="cast-names">
										<p className="label">{castDetails.name}</p>
										<p className="text-xs text-neutral-300">
											{castDetails.original_name}
										</p>
									</div>
								</div>
							))}
						</Slider>
					) : (
						<div>
							<p className="text-sm  text-yellow-100 text-center my-5">
								No Casts found
							</p>
						</div>
					)}
				</div>
			</section>

			<section className="similars sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
				<h2 className="title-1 highlight">Similar Movies for you</h2>
				{similarMovies?.length > 0 ? (
					<Slider {...multipleItemsSettings}>{similarMoviesSlides}</Slider>
				) : (
					<div>
						<p className="text-sm  text-yellow-100 text-center my-5">
							No Similar Movies found
						</p>
					</div>
				)}
			</section>
		</main>
	);
};

export default MovieDetails;
