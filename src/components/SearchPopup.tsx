import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { fetchSearchedMovies } from "../api/movieDB";

interface Suggestion {
	id: number;
	title: string;
}

interface SearchPopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
	const [query, setQuery] = useState<string>("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const debounce = (func: Function, delay: number) => {
		let timeoutId: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	};

	const filterSuggestions = useCallback(
		debounce((query: string) => {
			if (!query) {
				setFilteredSuggestions([]);
				return;
			}
			const lowercasedQuery = query.toLowerCase();
			fetchSearchedMovies({
				query: lowercasedQuery,
				include_adults: "false",
				language: "en-US",
				page: "1",
			}).then((data) => {
				if (data && data?.results) setFilteredSuggestions(data?.results);
				// setIsLoading(false);
			});
			// const filtered = staticSuggestions.filter((suggestion) =>
			// 	suggestion.name.toLowerCase().includes(lowercasedQuery)
			// );
			// setFilteredSuggestions(filtered);
		}, 300),
		[]
	);

	useEffect(() => {
		filterSuggestions(query);
	}, [query, filterSuggestions]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			inputRef.current?.focus();
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			if (query) {
				setQuery("");
			} else {
				onClose();
			}
		} else if (e.key === "Enter") {
			if (query.trim()) {
				navigate(`/search/${query}`);
				onClose();
			}
		}
	};

	const handleSuggestionClick = (id: string | number) => {
		navigate(`/movie-details/${id}`);
		onClose();
	};

	return (
		<div
			className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center transition-opacity duration-300 ${
				isOpen ? "opacity-100" : "opacity-0"
			} ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<div
				className={`bg-gray-800 p-8 rounded shadow-lg relative max-w-lg w-full mt-[5rem] h-max transition-transform duration-300 ${
					isOpen ? "transform scale-100" : "transform scale-90"
				}`}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
				>
					<IoCloseOutline />
				</button>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					className="border border-gray-600 p-2 w-full rounded bg-gray-700 "
					onKeyDown={handleKeyDown}
				/>
				{filteredSuggestions.length > 0 && (
					<ul className="mt-2 border dark:border-gray-600 rounded shadow-md transition-opacity duration-300 opacity-100 h-[300px] overflow-auto">
						{filteredSuggestions.map((suggestion) => (
							<li
								key={suggestion.id}
								onClick={() => handleSuggestionClick(suggestion.id)}
								className="p-2 hover:bg-gray-700 cursor-pointer transition-colors duration-150"
							>
								{suggestion.title}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SearchPopup;
