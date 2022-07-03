import React, { Component } from "react";

import Movies from "../components/Movies";
import Search from "../components/Search";
import Preloader from "../components/Preloader";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default class Main extends Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`${API_HOST}&s=Matrix`)
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  handleSearch = (value, type) => {
    this.setState({ loading: true });

    fetch(`${API_HOST}&s=${value}&type=${type !== "all" ? type : ""}`)
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movies, loading } = this.state;

    return (
      <main className="container content">
        <Search handleSearch={this.handleSearch} />
        {loading ? <Preloader /> : <Movies movies={movies} />}
      </main>
    );
  }
}
