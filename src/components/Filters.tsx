import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FiltersProps {
	selectedYear: string;
	setSelectedYear: (year: string) => void;
	selectedRegion: string;
	setSelectedRegion: (region: string) => void;
	selectedLanguage: string;
	setSelectedLanguage: (language: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
	selectedYear,
	setSelectedYear,
	selectedRegion,
	setSelectedRegion,
	selectedLanguage,
	setSelectedLanguage,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (selectedYear) {
			params.set("year", selectedYear);
		} else {
			params.delete("year");
		}

		if (selectedRegion) {
			params.set("region", selectedRegion);
		} else {
			params.delete("region");
		}

		if (selectedLanguage) {
			params.set("language", selectedLanguage);
		} else {
			params.delete("language");
		}

		setSearchParams(params);
	}, [selectedYear, selectedRegion, selectedLanguage, setSearchParams, searchParams]);

	const handleReset = () => {
		setSelectedYear("");
		setSelectedRegion("");
		setSelectedLanguage("");

		setSearchParams({});
	};

	return (
		<div className="p-4 flex flex-col gap-4 mt-[5rem] m-auto sm:w-[50%] s-full">
			<div className="flex gap-4 m-auto w-full">
				<div className="flex-1">
					<label htmlFor="year" className="block mb-2 text-sm font-medium text-white">
						Year
					</label>
					<select
						id="year"
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					>
						<option value="">All Years</option>
						{Array.from(new Array(50), (_, i) => (
							<option key={i} value={2024 - i}>
								{2024 - i}
							</option>
						))}
					</select>
				</div>

				<div className="flex-1">
					<label htmlFor="region" className="block mb-2 text-sm font-medium text-white">
						Region
					</label>
					<select
						id="region"
						value={selectedRegion}
						onChange={(e) => setSelectedRegion(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					>
						<option value="">All Regions</option>
						<option value="US">United States</option>
						<option value="IN">India</option>
					</select>
				</div>

				<div className="flex-1">
					<label htmlFor="language" className="block mb-2 text-sm font-medium text-white">
						Language
					</label>
					<select
						id="language"
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					>
						<option value="">All</option>
						<option value="en-US">English</option>
						<option value="hi-IN">Hindi</option>
						<option value="es-ES">Spanish</option>
					</select>
				</div>
			</div>

			<div className="flex justify-center mt-4">
				<button
					onClick={handleReset}
					className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
				>
					Reset Filters
				</button>
			</div>
		</div>
	);
};

export default Filters;
