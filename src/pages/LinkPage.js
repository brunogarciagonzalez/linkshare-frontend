import React from "react";
import URL from "../URL";

class LinkPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      id: null,
      url: null,
      avg_rating: null,
      avg_rating_stars: null,
      num_reviews: null,
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
    })
      .then(r => r.json())
      .then(json => {
        this.setState(
          {
            loaded: true,
            id: json.link.id,
            url: json.link.url,
            avg_rating: json.link.avg_rating,
            avg_rating_stars: this.getStars(json.link.avg_rating),
            num_reviews: json.link.num_reviews,
            reviews: json.link_reviews
          },
          () => console.log(this.state)
        );
      });
  }

  getStars = avg_rating => {
    if (avg_rating === 10) {
      return "⭐".repeat(10);
    } else if (avg_rating > 8.95) {
      return "⭐".repeat(9);
    } else if (avg_rating > 7.95) {
      return "⭐".repeat(8);
    } else if (avg_rating > 6.95) {
      return "⭐".repeat(7);
    } else if (avg_rating > 5.95) {
      return "⭐".repeat(6);
    } else if (avg_rating > 4.95) {
      return "⭐".repeat(5);
    } else if (avg_rating > 3.95) {
      return "⭐".repeat(4);
    } else if (avg_rating > 2.95) {
      return "⭐".repeat(3);
    } else if (avg_rating > 1.95) {
      return "⭐".repeat(2);
    } else {
      return "⭐".repeat(1);
    }
  };

  render() {
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">
              Link:{" "}
              <span className="linkshare_blue">
                <a href={this.state.url}>{this.state.url}</a>
              </span>
            </div>
            <div className="ui medium header centered">
              <div>
                {this.state.loaded
                  ? `${this.state.avg_rating_stars} (${
                      this.state.avg_rating
                    }) with ${this.state.num_reviews} ${
                      this.state.num_reviews > 1 ? "reviews" : "review"
                    }`
                  : null}
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="three wide column" />
        </div>
      </div>
    );
  }
}

export default LinkPage;
