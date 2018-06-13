import React from "react";
import { Redirect } from "react-router-dom";
import URL from "../URL";

class LinkSharePage extends React.Component {
  constructor() {
    super();

    this.state = {
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
        if (json.status === "success") {
          console.log("linkshare:", json);
          let user_share = json.user_share;
          let tagTitles = user_share.tags.map(tag => tag.title);

          this.setState({
            found: true,
            author: user_share.user,
            date: user_share.date.split("T")[0],
            linkUrl: user_share.link.url,
            selectedTags: tagTitles,
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

    return (
      <div>
        <div className="ui grid" id="hello">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">View LinkShare</div>

            <div id="author">
              <div className="ui medium header left linkshare_blue">Author</div>

              <p>By: {this.state.author}</p>
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
              {this.state.selectedTags.map(tag => <p key={tag}>{tag}</p>)}
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

          <div className="three wide column" />
        </div>
      </div>
    );
  }
}

export default LinkSharePage;
