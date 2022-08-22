import { useStore, useEvent } from "effector-react";

import { $userInput, $type, userInputSet, typeSet } from "../model";

const TYPES = ["all", "movie", "series"];

const Search = () => {
  const userInput = useStore($userInput);
  const searchType = useStore($type);

  const setUserInput = useEvent(userInputSet);
  const setType = useEvent(typeSet);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    userInput && setType(searchType);
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            className="validate"
            placeholder="Search"
            type="search"
            value={userInput}
            onChange={(evt) => setUserInput(evt.target.value)}
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
                  onChange={() => setType(type)}
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
