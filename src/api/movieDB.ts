import axios from "axios";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const apiBaseUrl = import.meta.env.VITE_MOVIE_API;

// endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

// dynamic endpoints
const movieDetailsEndpoint = (id: string) => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id: string) => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = (id: string) =>
	`${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// search endpoints
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

export const image500 = (path: string) => (path ? `https://image.tmdb.org/t/p/w500${path}` : null);
export const image342 = (path: string) => (path ? `https://image.tmdb.org/t/p/w342${path}` : null);
export const image185 = (path: string) => (path ? `https://image.tmdb.org/t/p/w185${path}` : null);
export const imageOriginal = (path: string) =>
	path ? `https://image.tmdb.org/t/p/original${path}` : null;

export const staticImage = "https://picsum.photos/seed/picsum/200/300";

const apiCall = async (endpoint: string, params?: any): Promise<any> => {
	const options = {
		method: "GET",
		url: endpoint,
		params: params ? params : {},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error("error", error);
		return {};
	}
};

export const fetchTrendingMovies = () => {
	return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
	return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
	return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (movie_id: string) => {
	return apiCall(movieDetailsEndpoint(movie_id));
};

export const fetchMovieCredits = (movie_id: string) => {
	return apiCall(movieCreditsEndpoint(movie_id));
};

export const fetchSimilarMovies = (movie_id: string) => {
	return apiCall(similarMoviesEndpoint(movie_id));
};

export const fetchSearchedMovies = (params: any) => {
	return apiCall(searchMoviesEndpoint, params);
};
