import React from "react";
import { Link } from "react-router-dom";

class TagLinkCard extends React.Component {
  constructor() {
    super();

    this.state = {
      showButton: false
    };
  }

  toggleCard = () => {
    this.setState({
      showButton: !this.state.showButton
    });
  };

  render() {
    return (
      <div
        className="card"
        key={this.props.link.link.id}
        onMouseEnter={this.toggleCard}
        onMouseLeave={this.toggleCard}
      >
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
          {!this.state.showButton ? (
            <div>
              <span className="right floated">
                {this.props.link.num_reviews}{" "}
                {this.props.link.num_reviews > 1 ? "Reviews" : "Review"}
              </span>
              <span>
                <i className="star icon star_gold" />
                Rating: {this.props.link.avg_rating}/10
              </span>
            </div>
          ) : (
            <div>
              <div className="center_text">
                <Link to={`/links/${this.props.link.link.id}`}>
                  <span className="star_gold">See Reviews</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TagLinkCard;
