import React from "react";

class LinkPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return <h1>Link {this.props.match.params.LinkID}</h1>;
  }
}

export default LinkPage;
