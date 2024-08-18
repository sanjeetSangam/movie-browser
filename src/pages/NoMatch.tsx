import { Link } from "react-router-dom";

const NoMatch = () => {
	return (
		<div className={"h-screen flex items-center justify-center flex-col"}>
			<h1>Invalid Page Url</h1>
			<Link
				to={"/"}
				className="p-3 border rounded-lg mt-5 hover:bg-slate-100 hover:text-black duration-200 hover:scale-110"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NoMatch;
