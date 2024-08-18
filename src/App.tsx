import { useEffect, useState } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Navigation from "./navigation";

const App = () => {
	const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<Navigation />;
			<ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
		</>
	);
};

export default App;
