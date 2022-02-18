import * as React from "react";

export default function MovieCard({ movie, users }) {
	const [modal, setModal] = React.useState(false);

	return (
		<div className="flex flex-row bg-white rounded-xl p-12 my-6 w-full h-1/2">
			<img alt={`Poster for ${movie.title}`} src={movie.poster} className="" />
			<div className="flex flex-col pl-12">
				<h2 className="text-4xl pb-4">{movie.title}</h2>
				<div className="pb-2">Year: {movie.year}</div>
				<div className="pb-2">Runtime: {movie.runtime} minutes</div>
				{movie.genres && movie.genres.length > 0 && (
					<div>
						Genres:
						<ul className="list-disc list-inside pb-4">
							{movie.genres.map((genre, index) => (
								<li
									key={`${movie._id}-genre-${index}`}
									className={genre === "Comedy" ? "font-bold" : ""}
								>
									{genre}
								</li>
							))}
						</ul>
					</div>
				)}
				{users && users.length > 0 && (
					<div className="flex">
						<button
							className="bg-sky-500 text-zinc-50 rounded p-2 mt-2 "
							onClick={() => setModal(!modal)}
						>
							Show Users
						</button>
					</div>
				)}
				<div
					className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
						modal ? "" : "hidden"
					}`}
					id="my-modal"
				>
					<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
						<ul className="list-none p-12">
							{users &&
								users.length > 0 &&
								users.map((user, index) => (
									<li className="mb-4" key={index}>
										<span className="font-bold">{user.email}</span>
										<br />
										{user.name}
									</li>
								))}
						</ul>
						<div className="flex justify-end">
							<button
								className="bg-red-400 text-zinc-50 rounded p-2 mt-2 "
								onClick={() => setModal(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
				<br />
			</div>
		</div>
	);
}
