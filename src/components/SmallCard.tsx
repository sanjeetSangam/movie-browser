import { useNavigate } from "react-router-dom";
import { image342, staticImage } from "../api/movieDB";
import { Movie } from "./FullscreenCard";
import useStore from "../store/zustand";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const SmallCard = ({ id, poster_path, title }: Movie) => {
	const navigate = useNavigate();
	const { toggleFavorite, favorites } = useStore();
	const isFavorite = favorites?.some((fav) => fav.id == id);
	const handleToggle = () => {
		const movieId = id;
		toggleFavorite({
			poster_path,
			id: movieId,
			title,
		});
	};

	const FavoriteIcn = !isFavorite ? BiHeart : FaHeart;

	return (
		<div className="card p-5 ">
			<div className="thumbnail relative">
				<div
					className="thumbnail-poster w-full mb-4 rounded-tr-xl rounded-bl-xl aspect-[4/6] bg-cover bg-center"
					style={{
						backgroundImage: `url(${image342(poster_path as string) || staticImage})`,
					}}
				></div>

				<div className="loved absolute top-0 right-0">
					<FavoriteIcn
						title={!isFavorite ? "Add" : "Remove"}
						onClick={handleToggle}
						size={30}
						className={`p-2  rounded ${
							!isFavorite
								? "hover:bg-cyan-600 bg-cyan-500"
								: "hover:bg-red-600 bg-red-500"
						} cursor-pointer duration-100`}
					/>
				</div>

				<button
					onClick={() => navigate(`/movie-details/${id}`)}
					className="bg-cyan-900 px-4 py-1 rounded-lg rounded-br-none cursor-pointer absolute bottom-0 right-0"
				>
					Details
				</button>
			</div>
			<div className="card-content">
				<p className="label">{title}</p>
			</div>
		</div>
	);
};

export default SmallCard;
