import React from "react";
import URL from "../URL";

class LinkPage extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      reviews: []
    };
  }

  componentDidMount() {
    fetch(`${URL}/links/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ link: { id: this.props.match.params.LinkID } })
    });
  }

  render() {
    return <h1>Link {this.props.match.params.LinkID}</h1>;
  }
}

export default LinkPage;
