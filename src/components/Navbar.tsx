import { useState } from "react";
import { BiHeart, BiSearch } from "react-icons/bi";
import SearchPopup from "./SearchPopup";
import { Link } from "react-router-dom";
import useStore from "../store/zustand";

const Navbar = () => {
	const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
	const { favorites } = useStore();

	return (
		<nav className="absolute top-0 z-10  w-full sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem] text-white flex justify-between items-center">
			<div className="logo-conatiner">
				<Link to={"/"}>
					<img
						src="/src/assets/CineSphere.png"
						alt=""
						className="w-[100px] sm:w-[187px]"
					/>
				</Link>
			</div>
			<div className="nav-options-container flex">
				<ul className="flex items-center gap-[1rem]">
					<BiSearch
						size={30}
						onClick={() => setPopupOpen(true)}
						className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer duration-100"
					/>
					<div className="loved relative">
						<Link to="/favourites">
							<BiHeart
								size={30}
								className="p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer duration-100"
							/>
						</Link>

						<p className="text-sm absolute top-[-8px] right-[-2px] font-bold">
							{favorites?.length}
						</p>
					</div>

					<SearchPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
