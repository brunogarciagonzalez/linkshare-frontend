import React from "react";
import { Link } from "react-router-dom";

class TagDirectoryWidget extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui large header centered">Explore Tags</div>
        <div className="ui four column grid">
          {this.props.tags.map(tag => {
            return (
              <div className="column" key={tag.id}>
                <Link to={`/tags/${tag.id}`}>{tag.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TagDirectoryWidget;
