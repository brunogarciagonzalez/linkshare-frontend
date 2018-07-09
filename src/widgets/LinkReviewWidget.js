import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Accordion, Icon, Header } from "semantic-ui-react";
import GetStars from "../widgets/GetStars";
import ReviewCommentModal from "../widgets/ReviewCommentModal";
import URL from "../URL";

class LinkReviewWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      notLoggedIn: false,
      showComments: false,
      userVoted: false,
      numHelpfulVotes: 0
    };
  }

  componentDidMount() {
    // have to fetch if user has voted helpfulness for this review
    fetch(`${URL}/review-votes/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        review: {
          review_id: this.props.reviewID,
          token: localStorage.getItem("token")
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        this.setState({
          numHelpfulVotes: json.helpful_votes,
          userVoted: json.current_user_voted
        });
      });
  }

  handleAccordionClick = (e, titleProps) => {
    this.setState({ showComments: !this.state.showComments });
  };

  handleHelpfulClick = e => {
    // ## expected params ####
    // # review: {
    //     # :review_id,
    //     # :token
    // # }
    if (!localStorage.getItem("token")) {
      this.setState({ notLoggedIn: true });
      return;
    }

    let helpfulBoolean;

    if (e.target.id === "yes_helpful") {
      helpfulBoolean = true;
    } else if (e.target.id === "no_helpful") {
      helpfulBoolean = false;
    } else {
      alert("Error @ handleHelpfulClick");
      return;
    }

    fetch(`${URL}/review-votes/construct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        review: {
          review_id: this.props.reviewID,
          token: localStorage.getItem("token"),
          helpful_boolean: helpfulBoolean
        }
      })
    })
      .then(r => r.json())
      .then(console.log);
  };

  render() {
    if (this.state.notLoggedIn) {
      return <Redirect push to={`/signin`} />;
    }

    return (
      <div className="ui segment">
        <h3 className="ui top attached header center_text">
          <div className="ui grid vertical_align">
            <div className="three wide column" />
            <div className="ten wide column">
              <Header>Review</Header>
            </div>
            <div className="three wide column">
              {localStorage.getItem("token") ? (
                <ReviewCommentModal
                  className="inline to_right"
                  handleNewComment={this.props.handleNewComment}
                  reviewID={this.props.review.review.id}
                  linkID={this.props.review.review.link_id}
                />
              ) : null}
            </div>
          </div>
        </h3>
        <br />
        <p>
          <span className="to_left bold">
            Author:{" "}
            <Link to={`/users/${this.props.review.reviewer.id}`}>
              {this.props.review.reviewer.username}
            </Link>
          </span>
          <span className="to_right bold">
            Last Update: {this.props.review.review.updated_at.split("T")[0]}
          </span>
        </p>
        <div className="ui section divider" />
        <div className="block">
          <span className="bold">Tags:</span>{" "}
          {this.props.review.user_share_tags.map(tag => (
            <Link
              key={tag.id}
              className="review_tag_padding"
              to={`/tags/${tag.id}`}
            >
              {tag.title}
            </Link>
          ))}
        </div>
        <br />
        <div className="block">
          <span className="bold">Rating:</span>{" "}
          <GetStars rating={this.props.review.review.rating} />{" "}
          {this.props.review.review.rating} out of 10
        </div>
        <br />
        <p className="bold">Content:</p>
        <p className="word_wrap">{this.props.review.review.content}</p>
        <div className="ui section divider" />
        {this.state.numHelpfulVotes > 0 ? (
          <p>
            {this.state.numHelpfulVotes === 1
              ? "1 person found this review helpful"
              : `${
                  this.state.numHelpfulVotes
                } people found this review helpful`}
          </p>
        ) : null}
        {this.state.userVoted ? (
          <p className="success_green">
            <i className="check icon" />Thank you for your feedback.
          </p>
        ) : (
          <p className="bold">
            Was this review helpful?{" "}
            <button
              id="yes_helpful"
              className="vote_button"
              onClick={this.handleHelpfulClick}
            >
              <i id="yes_helpful" className="thumbs up outline icon" /> Yes
            </button>
            <button
              id="no_helpful"
              className="vote_button"
              onClick={this.handleHelpfulClick}
            >
              <i id="no_helpful" className="thumbs down outline icon" /> No
            </button>
          </p>
        )}

        {this.props.review.review_comments.length > 0 ? (
          <div>
            <Accordion>
              <Accordion.Title
                className="linkshare_blue bold"
                active={this.state.showComments}
                onClick={this.handleAccordionClick}
              >
                <Icon name="dropdown" />
                Comments ({this.props.review.review_comments.length})
              </Accordion.Title>
              <Accordion.Content active={this.state.showComments}>
                <div>
                  {this.props.review.review_comments.map((comment, index) => {
                    return (
                      <div key={comment.id} className="ui segment">
                        <p>
                          <span className="to_left bold">
                            Author:{" "}
                            <Link to={`/users/${comment.review_commenter.id}`}>
                              {comment.review_commenter.username}
                            </Link>
                          </span>
                          <span className="to_right bold">
                            Last Update: {comment.updated_at.split("T")[0]}
                          </span>
                        </p>
                        <div className="ui section divider" />
                        <p>{comment.content}</p>
                      </div>
                    );
                  })}
                </div>
              </Accordion.Content>
            </Accordion>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LinkReviewWidget;
