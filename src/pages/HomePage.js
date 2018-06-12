import React from "react";
import SearchWidget from "../widgets/SearchWidget";
import TagDirectoryWidget from "../widgets/TagDirectoryWidget";

const URL = "http://localhost:3000";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
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
      <div>
        <SearchWidget tags={this.state.tags} />

        <TagDirectoryWidget tags={this.state.tags} />
      </div>
    ) : null;
  }
}

export default HomePage;
