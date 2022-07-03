import React, { Component } from "react";

import Movies from "../components/Movies";
import Search from "../components/Search";
import Preloader from "../components/Preloader";
import Pagination from "../components/Pagination";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default class Main extends Component {
  state = {
    movies: [],
    search: "Matrix",
    type: "",
    total: null,
    currentPage: 1,
    loading: true,
  };

  componentDidMount() {
    fetch(`${API_HOST}&s=${this.state.search}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
          total: data.totalResults,
          loading: false,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  handleSearch = (value, type) => {
    this.setState({ loading: true, total: null, currentPage: 1 });

    fetch(`${API_HOST}&s=${value}&type=${type !== "all" ? type : ""}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
          total: data.totalResults,
          search: value,
          type: type,
          loading: false,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  handleChangePage = (value) => {
    const { search, type } = this.state;

    this.setState({ loading: true, total: null });
    fetch(
      `${API_HOST}&s=${search}&type=${type !== "all" ? type : ""}&page=${value}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
          total: data.totalResults,
          currentPage: value,
          loading: false,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movies, total, currentPage, loading } = this.state;

    return (
      <main className="container content">
        <Search handleSearch={this.handleSearch} />
        {loading ? <Preloader /> : <Movies movies={movies} />}
        {total > 10 && (
          <Pagination
            handleChangePage={this.handleChangePage}
            total={total}
            currentPage={currentPage}
          />
        )}
      </main>
    );
  }
}
