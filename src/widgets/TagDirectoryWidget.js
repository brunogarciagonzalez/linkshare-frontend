import React from "react";

class TagDirectoryWidget extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui grid">
        <div className="three wide column" />

        <div className="ten wide column">
          <div className="ui segment">
            <div className="ui large header centered">Explore Tags</div>
            <div className="ui four column grid">
              {this.props.tags.map(tag => {
                return (
                  <div className="column" key={tag.id}>
                    {tag.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="three wide column" />
      </div>
    );
  }
}

export default TagDirectoryWidget;
