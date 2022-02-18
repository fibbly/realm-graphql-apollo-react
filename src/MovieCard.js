import * as React from "react";

export default function MovieCard({ movie }) {
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
						<ul className="list-disc list-inside">
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
				<br />
			</div>
		</div>
	);
}
