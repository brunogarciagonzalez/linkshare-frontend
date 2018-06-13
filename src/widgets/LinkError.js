import React from "react";

class LinkError extends React.Component {
  render() {
    return (
      <div id="link">
        <div className="ui medium header left linkshare_blue">Link</div>
        <div className="ui fluid labeled input error">
          <div className="ui label">https://</div>
          <input
            type="text"
            placeholder="example.com"
            value={this.props.linkUrl}
            onChange={this.props.handleLinkUrl}
          />
        </div>
      </div>
    );
  }
}

export default LinkError;
