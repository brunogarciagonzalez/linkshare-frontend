import React from "react";
import { Redirect, Link } from "react-router-dom";
import URL from "../URL";

class LinkSharePage extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      found: null,
      redirect: false,
      author: null,
      date: null,
      linkUrl: "",
      selectedTags: [],
      reviewRating: null,
      reviewContent: ""
    };
  }

  componentDidMount() {
    console.log("inside of componentDidMount");
    // fetch user share given this.props.match.params.shareID
    fetch(`${URL}/user-shares/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_share: { id: this.props.match.params.shareID }
      })
    })
      .then(r => r.json())
      .then(json => {
        debugger;
        if (json.status === "success") {
          console.log("linkshare:", json);
          let user_share = json.user_share;

          this.setState({
            loaded: true,
            found: true,
            author: user_share.user,
            date: user_share.date.split("T")[0],
            linkUrl: user_share.link.url,
            selectedTags: user_share.tags,
            reviewRating: user_share.review.rating,
            reviewContent: user_share.review.content
          });
        } else {
          this.setState({
            found: "false"
          });
        }
      });
  }

  render() {
    if (this.state.found === "false") {
      return <h1>Not Found</h1>;
    }

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    if (!this.state.loaded) {
      return (
        <div className="ui active centered loader loader_push_down block" />
      );
    }

    return (
      <div>
        <div className="ui grid" id="hello">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">View LinkShare</div>

            <div id="author">
              <div className="ui medium header left linkshare_blue">Author</div>

              <p>
                By:{" "}
                <Link to={`/users/${this.state.author.id}`}>
                  {this.state.author.username}
                </Link>
              </p>
              <p>Last Update: {this.state.date}</p>
            </div>

            <br />

            <div id="link">
              <div className="ui medium header left linkshare_blue">Link</div>
              <p>{this.state.linkUrl}</p>
            </div>

            <br />

            <div id="tags">
              <div className="ui medium header left linkshare_blue">Tags</div>
              {this.state.selectedTags.map(tag => (
                <p key={tag.id}>
                  <Link to={`/tags/${tag.id}`}>{tag.title}</Link>
                </p>
              ))}
            </div>

            <br />

            <div id="review">
              <div className="ui medium header left linkshare_blue">Review</div>
              <div className="ui small header left">Rating</div>
              <p>{this.state.reviewRating}</p>
              <div className="ui small header left">Content</div>
              <p className="word_wrap">{this.state.reviewContent}</p>
            </div>
          </div>

          <div className="three wide column">
            {this.props.justShared ? (
              <div className="ui yellow compact message">
                <div className="header">Booyah!</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default LinkSharePage;
