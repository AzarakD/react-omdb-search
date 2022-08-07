import { useStore } from "effector-react";

import { $search, $type, getData, setSearch, setType } from "../model/model";

const TYPES = ["all", "movie", "series"];

const Search = () => {
  const search = useStore($search);
  const searchType = useStore($type);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setType(TYPES[0]);
    getData({ search });
  };

  const handleChangeType = (type) => {
    setType(type);
    getData({ search, type });
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            className="validate"
            placeholder="Search"
            type="search"
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
          <div className="radio-buttons">
            {TYPES.map((type) => (
              <label key={type}>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  data-type={type}
                  checked={searchType === type}
                  onChange={() => handleChangeType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <button className="btn search-btn" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
