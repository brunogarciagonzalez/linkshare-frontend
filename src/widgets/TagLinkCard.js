import React from "react";
import { Link, Redirect } from "react-router-dom";

class TagLinkCard extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      showButton: false
    };
  }

  toggleCard = () => {
    this.setState({
      showButton: !this.state.showButton
    });
  };

  handleClick = e => {
    if (!e.target.classList.contains("link")) {
      this.setState({ redirect: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/links/${this.props.link.link.id}`} />;
    }
    return (
      <div
        className="card"
        key={this.props.link.link.id}
        onMouseEnter={this.toggleCard}
        onMouseLeave={this.toggleCard}
        onClick={this.handleClick}
      >
        <div className="content">
          <div className="header">
            {this.props.link.preview.title
              ? this.props.link.preview.title
              : this.props.link.link.url}
          </div>
          <div className="meta">
            <a className="linkshare_blue link" href={this.props.link.link.url}>
              {this.props.link.link.url}
            </a>
          </div>
          <div className="description">
            {this.props.link.preview.description.includes("Invalid") ||
            this.props.link.preview.description === "" ||
            this.props.link.preview.description.includes("Too many requests")
              ? "A description for this website is not available at this time."
              : `"${this.props.link.preview.description}"`}
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
