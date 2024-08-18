import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyMovieDetails = lazy(() => import("../pages/MovieDetails"));
const LazyNoMatch = lazy(() => import("../pages/NoMatch"));
const LazyResults = lazy(() => import("../pages/Results"));

interface SuspenseWrapperProps {
	children: React.ReactNode;
}

const LoadingFallback = () => (
	<div className="h-screen w-full flex justify-center items-center">Loading...</div>
);

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children }) => (
	<Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const Navigation = () => {
	return (
		<Router>
			<div className="flex relative flex-col min-h-screen text-white">
				<Navbar />
				<main className="flex-1 relative">
					<Routes>
						<Route
							path="/"
							element={
								<SuspenseWrapper>
									<LazyHome />
								</SuspenseWrapper>
							}
						/>
						<Route
							path="/search/:query"
							element={
								<SuspenseWrapper>
									<LazyResults />
								</SuspenseWrapper>
							}
						/>
						<Route
							path="/favourites"
							element={
								<SuspenseWrapper>
									<LazyResults mode="favorites" />
								</SuspenseWrapper>
							}
						/>
						<Route
							path="/movie-details/:id"
							element={
								<SuspenseWrapper>
									<LazyMovieDetails />
								</SuspenseWrapper>
							}
						/>
						<Route
							path="*"
							element={
								<SuspenseWrapper>
									<LazyNoMatch />
								</SuspenseWrapper>
							}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default Navigation;
