import React from "react";

const FullscreenCardSkeleton: React.FC = () => {
	return (
		<div className="flex items-end sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem] relative h-screen bg-gray-300 animate-pulse">
			<div className="absolute inset-0 bg-gray-500"></div>
			<div className="text-white py-6 w-full sm:max-w-[60%] relative z-1 flex flex-col gap-[8px]">
				<div className="movie-labels flex flex-col gap-[2px]">
					<div className="w-1/4 h-4 bg-gray-400 rounded mb-2"></div>
					<div className="w-3/4 h-8 bg-gray-400 rounded"></div>
				</div>
				<div className="info flex gap-4 labels highlight">
					<div className="w-1/6 h-4 bg-gray-400 rounded"></div>
					<div className="w-1/4 h-4 bg-gray-400 rounded"></div>
					<div className="w-1/6 h-4 bg-gray-400 rounded"></div>
				</div>
				<div className="w-full h-16 bg-gray-400 rounded mt-4"></div>
				<button className="w-max bg-gray-400 py-2 px-2 rounded-md flex items-center justify-center gap-3 cursor-not-allowed mt-4">
					<div className="w-4 h-4 bg-gray-300 rounded-full"></div>
					<div className="w-1/4 h-4 bg-gray-300 rounded"></div>
				</button>
			</div>
		</div>
	);
};

export default FullscreenCardSkeleton;
