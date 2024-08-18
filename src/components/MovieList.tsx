import React from "react";
import SmallCard from "../components/SmallCard";
import SkeletonLoader from "../components/skeletons/SkeletonSmallCard";
import { Movie } from "./FullscreenCard";

interface MovieListProps {
	loading: boolean;
	error: string | null;
	movies: Movie[];
	query: string;
	loadingMore: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ loading, error, movies, query, loadingMore }) => {
	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
				{loading &&
					!loadingMore &&
					[...Array(8)].map((_, index) => <SkeletonLoader key={index} />)}
				{!loading && error && <div className="text-red-500 p-4">Error: {error}</div>}
				{!loading && !error && movies.length === 0 && (
					<div className="text-gray-500 p-4">No results found for "{query}"</div>
				)}
				{!loading &&
					!error &&
					movies.map((movie) => (
						<SmallCard
							key={movie.id}
							id={movie.id}
							poster_path={movie.poster_path}
							title={movie.title}
						/>
					))}
			</div>

			{loadingMore && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{[...Array(8)].map((_, index) => (
						<SkeletonLoader key={index} />
					))}
				</div>
			)}
		</>
	);
};

export default MovieList;
