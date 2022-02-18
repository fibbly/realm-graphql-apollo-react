import "./styles.css";
import * as React from "react";
import { APP_ID, app } from "./index";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_MOVIE, UPDATE_MOVIE } from "./graphql-operations";
import MovieCard from "./MovieCard";

export default function App(props) {
	const [searchText, setSearchText] = React.useState("The Matrix Reloaded");
	const { loading, data } = useQuery(FIND_MOVIE, {
		variables: { query: { title: searchText } },
	});

	const [movie, setMovie] = React.useState([]);

	React.useEffect(() => {
		const movieData = data?.movie ? [data.movie] : [];
		// console.log("setMovie", movieData);
		setMovie(movieData);
	}, [data]);

	//let movie = data ? data.movie : null;
	const [updateMovie, { loading: updating }] = useMutation(UPDATE_MOVIE);
	const [newTitleText, setNewTitleText] = React.useState("Silly New Title");

	const updateMovieTitle = async () => {
		if (!movie) return;
		await updateMovie({
			variables: {
				query: { title: movie.title },
				set: { title: newTitleText },
			},
		});
		setSearchText(newTitleText);
	};

	async function getComedies() {
		const comedies = await app.currentUser.callFunction("getComedies");
		setMovie(comedies);
	}

	return (
		<div className="flex flex-col h-screen p-12">
			<header className="pb-12 mb-6">
				<h1 className="text-6xl font-bold text-slate-500">Find a Movie</h1>
				<span className="text-2xl text-gray-400">
					The app automatically searches as you type
				</span>
			</header>
			<div className="flex flex-row h-screen">
				<aside className="flex flex-col w-1/4 border-r-2 pr-12">
					<input
						className="border-2 rounded p-2 m-4"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						type="text"
					/>
					{APP_ID === "<Your App ID>" ? (
						<div className="status important">
							Replace APP_ID with your App ID in index.js
						</div>
					) : (
						!loading &&
						!movie && <div className="status">No movie with that name!</div>
					)}
					{movie && (
						<div>
							{!updating && (
								<div>
									<div className="title-input mb-6 flex flex-col pb-6 border-b-2">
										<input
											type="text"
											className="border-2 rounded p-2 mx-4"
											value={newTitleText}
											onChange={(e) => setNewTitleText(e.target.value)}
										/>
										<button
											className="bg-blue-800 text-zinc-50 rounded p-2 mt-2 mx-4"
											onClick={() => updateMovieTitle()}
										>
											Change the movie title
										</button>
									</div>
									<div className="flex flex-col">
										<button
											className="bg-sky-500 text-zinc-50 rounded p-2 mt-2 mx-4"
											onClick={() => getComedies()}
										>
											Get Comedies
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</aside>
				<main className="flex flex-col px-12 bg-slate-50 w-full overflow-scroll">
					{movie &&
						movie.length > 0 &&
						movie.map((movie, _) => (
							<MovieCard key={movie._id} movie={movie} />
						))}
				</main>
			</div>
		</div>
	);
}
