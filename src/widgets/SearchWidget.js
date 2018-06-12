import React from "react";
import SearchResultsWidget from "./SearchResultsWidget";

class SearchWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      searched: false,
      randomTagName: null,
      searchedTerm: "",
      currentSearchTerm: "",
      resultsLoading: false,
      results: []
    };
  }

  componentDidMount() {
    let num = Math.floor(Math.random() * this.props.tags.length);
    let tag = this.props.tags[num];

    let options = this.props.tags.map(tag => {
      return { value: tag.title, key: tag.title, text: tag.title };
    });

    this.setState({
      randomTagName: tag.title,
      options: options
    });
  }

  handleSearchChange = e => {
    this.setState({
      currentSearchTerm: e.target.value
    });
  };

  handleSearchSubmit = e => {
    if (e.key === "Enter" && this.state.currentSearchTerm !== "") {
      let results = this.props.tags.filter(tag => {
        return tag.title
          .toLowerCase()
          .includes(this.state.currentSearchTerm.toLowerCase());
      });

      this.setState(
        {
          results,
          searched: true,
          searchedTerm: this.state.currentSearchTerm,
          currentSearchTerm: "",
          resultsLoading: true
        },
        () => {
          window.setTimeout(
            () => this.setState({ resultsLoading: false }),
            300
          );
        }
      );
    }
  };

  render() {
    return (
      <div className="ui grid">
        <div className="three wide column" />

        <div className="ten wide column">
          <div className="ui segment">
            <div className="ui large header centered">Search Tags</div>
            <div className="ui search">
              <div className="ui icon input fluid">
                <input
                  className="prompt"
                  type="text"
                  placeholder={this.state.randomTagName}
                  value={this.state.currentSearchTerm}
                  onChange={this.handleSearchChange}
                  onKeyPress={this.handleSearchSubmit}
                />
                <i className="search icon" />
              </div>
              {this.state.searched ? (
                <SearchResultsWidget
                  loading={this.state.resultsLoading}
                  searched={this.state.searchedTerm}
                  results={this.state.results}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="three wide column" />
      </div>
    );
  }
}

export default SearchWidget;
