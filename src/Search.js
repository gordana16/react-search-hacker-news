import React from "react";

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <nav className="navbar navbar-light bg-primary justify-content-between">
      <span className="navbar-brand text-white">Search Hacker News</span>
      <form className="form-inline" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="search"
          value={value}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-primary mb-2">
          {children}
        </button>
      </form>
    </nav>
  );
};

export default Search;
