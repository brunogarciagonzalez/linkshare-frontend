import React from "react";

class TagLinkCard extends React.Component {
  render() {
    return (
      <div className="card" key={this.props.link.link.id}>
        <div className="content">
          <div className="header">{this.props.link.preview.title}</div>
          <div className="meta">
            <a className="linkshare_blue" href={this.props.link.link.url}>
              {this.props.link.link.url}
            </a>
          </div>
          <div className="description">
            Description: "{this.props.link.preview.description}"
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">
            {this.props.link.num_reviews} Reviews
          </span>
          <span>
            <i className="star icon star_gold" />
            Rating: {this.props.link.avg_rating}/10
          </span>
        </div>
      </div>
    );
  }
}

export default TagLinkCard;
