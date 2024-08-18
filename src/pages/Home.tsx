import React, { useEffect, useMemo, useState } from "react";
import Slider, { Settings } from "react-slick";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/movieDB";
import FullscreenCard, { Movie } from "../components/FullscreenCard";
import SmallCard from "../components/SmallCard";
import useStore from "../store/zustand";
import SkeletonFullscreenCard from "../components/skeletons/SkeletonFullscreenCard";
import SkeletonSmallCard from "../components/skeletons/SkeletonSmallCard";

const settings: Settings = {
	dots: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	autoplay: true,
	autoplaySpeed: 3000,
	lazyLoad: "ondemand",
};

export const multipleItemsSettings: Settings = {
	dots: true,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 2,
	arrows: true,
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

const Home: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const data = useStore((state) => state?.data);
	const setData = useStore((state) => state?.setData);

	const fetchMoviesData = async () => {
		try {
			const [trendingData, upcomingData, topRatedData] = await Promise.all([
				fetchTrendingMovies(),
				fetchUpcomingMovies(),
				fetchTopRatedMovies(),
			]);

			const newData = {
				trending: trendingData.results as Movie,
				upcoming: upcomingData.results as Movie,
				topRated: topRatedData.results as Movie,
			};

			setData(newData);
		} catch (error) {
			console.error("Error fetching movie data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (data) {
			setIsLoading(false);
		} else {
			fetchMoviesData();
		}
	}, []);

	const trendingSlides = useMemo(
		() =>
			data?.trending?.length
				? data.trending.map((movie: Movie) => <FullscreenCard key={movie.id} {...movie} />)
				: Array(1)
						.fill(null)
						.map((_, index) => <SkeletonFullscreenCard key={index} />),
		[data?.trending]
	);

	const upcomingSlides = useMemo(
		() =>
			data?.upcoming?.length
				? data.upcoming.map((movie: Movie) => <SmallCard key={movie.id} {...movie} />)
				: Array(5)
						.fill(null)
						.map((_, index) => <SkeletonSmallCard key={index} />),
		[data?.upcoming]
	);

	const topRatedSlides = useMemo(
		() =>
			data?.topRated?.length
				? data.topRated.map((movie: Movie) => <SmallCard key={movie.id} {...movie} />)
				: Array(5)
						.fill(null)
						.map((_, index) => <SkeletonSmallCard key={index} />),
		[data?.topRated]
	);

	return (
		<main className="relative flex-1">
			{isLoading ? (
				<>
					<section className="hero-section">
						{Array(1)
							.fill(null)
							.map((_, index) => (
								<SkeletonFullscreenCard key={index} />
							))}
					</section>
					<section className="hero-section sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
						<div className="title-1 mb-5">Upcoming Movies</div>
						<Slider {...multipleItemsSettings}>
							{Array(5)
								.fill(null)
								.map((_, index) => (
									<SkeletonSmallCard key={index} />
								))}
						</Slider>
					</section>
					<section className="hero-section sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
						<div className="title-1 mb-5">Top Rated Movies</div>
						<Slider {...multipleItemsSettings}>
							{Array(5)
								.fill(null)
								.map((_, index) => (
									<SkeletonSmallCard key={index} />
								))}
						</Slider>
					</section>
				</>
			) : (
				<>
					<section className="hero-section">
						<Slider {...settings}>{trendingSlides}</Slider>
					</section>
					<section className="hero-section sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
						<div className="title-1 mb-5">Upcoming Movies</div>
						<Slider {...multipleItemsSettings}>{upcomingSlides}</Slider>
					</section>
					<section className="hero-section sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
						<div className="title-1 mb-5">Top Rated Movies</div>
						<Slider {...multipleItemsSettings}>{topRatedSlides}</Slider>
					</section>
				</>
			)}
		</main>
	);
};

export default Home;
