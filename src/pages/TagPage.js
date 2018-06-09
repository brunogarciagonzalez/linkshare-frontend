import React from "react";

class TagPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return <h1>Tag Page: ID {this.props.match.params.TagID}</h1>;
  }
}

export default TagPage;
