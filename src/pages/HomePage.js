import React from "react";
import SearchWidget from "../widgets/SearchWidget";
import TagDirectoryWidget from "../widgets/TagDirectoryWidget";
import URL from "../URL";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      justLoggedIn: false,
      loaded: false,
      tags: []
    };
  }

  componentDidMount() {
    fetch(`${URL}/tags`)
      .then(r => r.json())
      .then(json => {
        console.log("json", json);
        return json;
      })
      .then(json => this.setState({ tags: json["tags"], loaded: true }));
  }

  render() {
    return this.state.loaded ? (
      <div className="ui grid">
        <div className="three wide column" />

        <div className="ten wide column">
          <SearchWidget tags={this.state.tags} />

          <TagDirectoryWidget tags={this.state.tags} />
        </div>
        <div className="three wide column">
          {this.props.justLoggedIn ? (
            <div className="ui yellow compact message">
              <div className="header">Welcome back!</div>
            </div>
          ) : null}
          {this.props.justRegistered ? (
            <div className="ui yellow compact message">
              <div className="header">
                Registration successful.
                <br />Welcome!
              </div>
            </div>
          ) : null}
          {this.props.justLoggedOut ? (
            <div className="ui yellow compact message">
              <div className="header">Peace!</div>
            </div>
          ) : null}
        </div>
      </div>
    ) : null;
  }
}

export default HomePage;
