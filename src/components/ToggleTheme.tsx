import { useState, useEffect } from "react";

function ToggleTheme() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	useEffect(() => {
		document.documentElement.className = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<button onClick={toggleTheme} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
			{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
		</button>
	);
}

export default ToggleTheme;
