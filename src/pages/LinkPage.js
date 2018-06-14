import React from "react";
import GetStars from "../widgets/GetStars";
import LinkReviewWidget from "../widgets/LinkReviewWidget";
import LinkChartWidget from "../widgets/LinkChartWidget";
import URL from "../URL";

class LinkPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      id: null,
      url: null,
      avg_rating: null,
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
        this.setState({
          loaded: true,
          id: json.link.id,
          url: json.link.url,
          avg_rating: json.link.avg_rating,
          num_reviews: json.link.num_reviews,
          reviews: json.link_reviews
        });
      });
  }

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
                <GetStars rating={this.state.avg_rating} />
              </div>
              <div>
                Average Rating:{" "}
                <span className="star_gold">{this.state.avg_rating}</span>
              </div>
              <div>
                {this.state.num_reviews}{" "}
                {this.state.num_reviews > 1 ? "Reviews" : "Review"}
              </div>
            </div>
            <br />
            <br />
            {this.state.loaded ? (
              <div>
                <LinkChartWidget
                  className="column"
                  reviews={this.state.reviews}
                  link={this.state.url}
                />
                <br />
                <br />

                <div>
                  {this.state.reviews.map((review, index) => {
                    return (
                      <LinkReviewWidget
                        num={index + 1}
                        key={review.review.id}
                        review={review}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="ui active centered inline loader" />
            )}
          </div>
          <div className="three wide column" />
        </div>
      </div>
    );
  }
}

export default LinkPage;
