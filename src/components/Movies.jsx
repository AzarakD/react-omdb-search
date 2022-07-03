import React from "react";
import Movie from "./Movie";

const Movies = (props) => {
  const { movies } = props;

  return (
    <div className="movies">
      {movies ? (
        movies.map((movie) => <Movie key={movie.imdbID} {...movie} />)
      ) : (
        <h5>Nothing found</h5>
      )}
    </div>
  );
};

export default Movies;
