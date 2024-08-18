import React from "react";

const CastSkeleton: React.FC = () => {
	return (
		<div className="casts sm:px-[5rem] px-[2rem] sm:py-[1rem] py-[0.5rem]">
			<h2 className="mb-5">Cast</h2>
			<div className="cast-details w-full animate-pulse">
				<div className="flex overflow-x-scroll space-x-4">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="flex-shrink-0 w-24 h-32 bg-gray-400 rounded-full"
						></div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CastSkeleton;
