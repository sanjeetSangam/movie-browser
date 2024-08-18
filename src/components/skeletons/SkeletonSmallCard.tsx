import React from "react";

const SkeletonLoader: React.FC = () => {
	return (
		<div className="card p-5 animate-pulse">
			<div className="w-full h-48 bg-gray-300 mb-4 rounded-tr-xl rounded-bl-xl" />
			<div className="card-content">
				<div className="w-3/4 h-6 bg-gray-300 rounded mb-2" />
				<div className="w-1/2 h-4 bg-gray-300 rounded" />
			</div>
		</div>
	);
};

export default SkeletonLoader;
