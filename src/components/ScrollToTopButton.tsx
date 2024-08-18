import React from "react";

interface ScrollToTopButtonProps {
	showScrollTop: boolean;
	scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ showScrollTop, scrollToTop }) => {
	return (
		showScrollTop && (
			<button
				onClick={scrollToTop}
				className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
			>
				⬆️
			</button>
		)
	);
};

export default ScrollToTopButton;
