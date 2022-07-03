import React, { Component } from "react";

const TYPES = ["all", "movie", "series"];

export class Search extends Component {
  state = {
    search: "Matrix",
    type: TYPES[0],
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.handleSearch(this.state.search, this.state.type);
  };

  handleChangeType = (evt) => {
    this.setState({ type: evt.target.dataset.type }, () =>
      this.props.handleSearch(this.state.search, this.state.type)
    );
  };

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              className="validate"
              placeholder="Search"
              type="search"
              value={this.state.search}
              onChange={(evt) => this.setState({ search: evt.target.value })}
            />
            <div className="radio-buttons">
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  data-type={TYPES[0]}
                  checked={this.state.type === TYPES[0]}
                  onChange={this.handleChangeType}
                />
                <span>All</span>
              </label>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  data-type={TYPES[1]}
                  checked={this.state.type === TYPES[1]}
                  onChange={this.handleChangeType}
                />
                <span>Movies only</span>
              </label>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  data-type={TYPES[2]}
                  checked={this.state.type === TYPES[2]}
                  onChange={this.handleChangeType}
                />
                <span>Series Only</span>
              </label>
            </div>
            <button className="btn search-btn" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
