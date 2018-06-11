import React from "react";

class SearchWidget extends React.Component {
  constructor() {
    super();

    this.state = {
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
      .then(json =>
        this.setState({ tags: json["tags"] }, () =>
          console.log("state", this.state)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Tags</h2>
        <div>
          {this.state.tags.map(tag => {
            return <p key={tag.id}>{tag.title}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default SearchWidget;
