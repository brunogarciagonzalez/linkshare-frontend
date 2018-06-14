import React from "react";
import { Link } from "react-router-dom";

class SearchResultsWidget extends React.Component {
  render() {
    return (
      <div>
        <br />
        {!this.props.loading ? (
          this.props.results.length > 0 ? (
            <div>
              <div>
                <strong>Searched: {this.props.searched}</strong>
                <div class="ui section divider" />
              </div>

              <div>
                {this.props.results.map(tag => {
                  return (
                    <div key={tag.id}>
                      <Link to={`/tags/${tag.id}`}>{tag.title}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <strong>Searched: {this.props.searched}</strong>
              <div class="ui section divider" />
              <div>No search results.</div>
            </div>
          )
        ) : (
          <div className="ui active centered inline loader" />
        )}
      </div>
    );
  }
}

export default SearchResultsWidget;
