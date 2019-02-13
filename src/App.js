import React, { Component } from "react";
import "./App.css";
import Search from "./Search";
import Table from "./Table";
import Pagination from "./Pagination";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = 10;

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      results: null,
      searchKey: "",
      page: 0
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.pageFetchHandler = this.pageFetchHandler.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    // console.log("setSearchTopStories", result);
    const { hits, page, nbPages } = result;
    const { searchKey, results } = this.state;
    const oldPages =
      results && results[searchKey] ? results[searchKey].pages : [];
    const updatePages = { ...oldPages, [page]: { hits: hits } };

    this.setState({
      results: {
        ...results,
        [searchKey]: { pages: updatePages, nbPages: nbPages }
      }
    });
  }
  needsToSearchTopStories() {
    const { searchTerm, page } = this.state;
    return !(
      this.state.results[searchTerm] &&
      this.state.results[searchTerm].pages[page]
    );
  }

  fetchSearchTopStories() {
    const { searchTerm, page } = this.state;
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearchSubmit(event) {
    this.setState({ searchKey: this.state.searchTerm, page: 0 });
    if (this.needsToSearchTopStories()) {
      this.fetchSearchTopStories();
    }
    event.preventDefault();
  }
  pageFetchHandler(page) {
    this.setState({ page: page });
  }

  onDismiss(id) {
    const { results, searchKey, page } = this.state;
    const updatedHits = results[searchKey].pages[page].hits.filter(
      item => item.objectID !== id
    );
    const updatedPages = {
      ...results[searchKey].pages,
      [page]: { hits: updatedHits }
    };
    const updatedSearchKey = { ...results[searchKey], pages: updatedPages };
    this.setState({
      results: { ...results, [searchKey]: updatedSearchKey }
    });
  }

  componentDidMount() {
    this.setState({ searchKey: this.state.searchTerm });
    this.fetchSearchTopStories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      if (this.needsToSearchTopStories()) {
        this.fetchSearchTopStories();
      }
    }
  }

  render() {
    // console.log("render ", this.state);
    const { searchTerm, results, searchKey, page } = this.state;
    const list =
      (results &&
        results[searchKey] &&
        results[searchKey].pages[page] &&
        results[searchKey].pages[page].hits) ||
      [];
    return (
      <div>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        {<Table list={list} onDismiss={this.onDismiss} />}
        {list.length ? (
          <Pagination
            currentPage={page + 1}
            nbPages={
              (results && results[searchKey] && results[searchKey].nbPages) || 0
            }
            fetchPage={this.pageFetchHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
