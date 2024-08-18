import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataState {
	data: any | null;
	favorites: any[] | null;
	setData: (newData: any) => void;
	toggleFavorite: (movie: any) => void;
}

const useStore = create<DataState>()(
	persist(
		(set, get) => ({
			data: null,
			setData: (newData) => set({ data: newData }),
			favorites: [],
			toggleFavorite: (movie) => {
				const favorites = get().favorites || [];
				const isFavorite = favorites.some((fav) => fav.id == movie.id);

				if (isFavorite) {
					set({
						favorites: favorites.filter((fav) => fav.id != movie.id),
					});
				} else {
					set({
						favorites: [...favorites, movie],
					});
				}
			},
		}),
		{
			name: "movies-data",
		}
	)
);

export default useStore;
