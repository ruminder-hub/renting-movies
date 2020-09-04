import React, { Component } from "react";

import { getMovies } from "./../services/fakeMovieService";
import { getGenres } from "./../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listgroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movieId) => {
    let movies = this.state.movies.filter((movie) => movie._id !== movieId);
    this.setState({ movies: movies });
  };

  totalMovies = () => {
    if (this.state.movies.length > 0) {
      return `Showing ${this.state.movies.length} movies in the database`;
    }
    return `There are no movies in the database`;
  };

  handleLikeToggle = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = movie;
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);

    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    if (count === 0) {
      return <h4>There are no movies in the database</h4>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLikeToggle}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
