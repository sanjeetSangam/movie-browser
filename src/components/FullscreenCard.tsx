import { BiArchive } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { imageOriginal, staticImage } from "../api/movieDB";
import { Genre } from "../pages/MovieDetails";
import useStore from "../store/zustand";

export interface Movie {
	id?: string | number;
	poster_path?: string;
	backdrop_path?: string;
	title?: string;
	release_date?: string;
	runtime?: number | string;
	genres?: Genre[];
	type?: string;
	overview?: string;
	customGradient?: string;
}

const FullscreenCard = ({
	poster_path,
	id,
	backdrop_path,
	title,
	release_date,
	runtime,
	genres = [],
	overview,
	customGradient = "bg-gradient-custom",
}: Movie) => {
	const { id: paramsId } = useParams();
	const navigate = useNavigate();
	const imageUrl = backdrop_path
		? imageOriginal(
				window.innerWidth >= 640 ? (backdrop_path as string) : (poster_path as string)
		  )
		: staticImage;

	const { toggleFavorite, favorites } = useStore();
	const isFavorite = favorites?.some((fav) => fav.id == id || fav.id == paramsId);
	const handleToggle = () => {
		const movieId = id || paramsId;
		toggleFavorite({
			poster_path,
			id: movieId,
			backdrop_path,
			title,
			release_date,
			runtime,
			genres,
			overview,
		});
	};

	return (
		<div
			className={`flex items-end sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem] relative h-screen bg-cover bg-center object-contain bg-no-repeat`}
			style={{
				backgroundImage: `url(${imageUrl})`,
			}}
		>
			<div className={`absolute inset-0 ${customGradient}`}></div>
			<div className=" text-white py-6 w-full sm:max-w-[60%] relative z-1 flex flex-col gap-[8px]">
				<div className="movie-labels flex flex-col gap-[2px]">
					<p className="title-1">{release_date}</p>
					<h1 className="title">{title}</h1>
				</div>
				<div className="info flex gap-4 labels highlight">
					<span>{runtime} min</span>
				</div>
				<div className="flex">
					{genres?.length > 0 &&
						genres.map((genre, index) => {
							let showDots = index + 1 != genres.length;
							return (
								<p
									className="text-neutral-400 font-semibold text-base text-center"
									key={genre.id}
								>
									{genre.name} {showDots ? " • " : ""}
								</p>
							);
						})}
				</div>
				<p className="labels line-clamp-3" title={overview}>
					{overview}
				</p>

				<div className="actions flex gap-4 mt-2">
					<button
						className={`w-max ${
							isFavorite ? "bg-red-500" : "bg-cyan-500"
						} py-2 px-2 rounded-md flex items-center justify-center gap-3 cursor-pointer`}
						onClick={handleToggle}
					>
						<BiArchive /> {isFavorite ? "Remove favroite" : "Add to Wishlist"}
					</button>

					{!paramsId && id && (
						<button
							onClick={() => navigate(`/movie-details/${id}`)}
							className="bg-cyan-900 px-4 py-1 rounded-lg cursor-pointer w-max flex gap-3 items-center"
						>
							<TbListDetails /> Details
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FullscreenCard;
