import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Icon, Header } from "semantic-ui-react";
import GetStars from "../widgets/GetStars";
import ReviewCommentModal from "../widgets/ReviewCommentModal";

class LinkReviewWidget extends React.Component {
  constructor() {
    super();

    this.state = { showComments: false };
  }

  handleClick = (e, titleProps) => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
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

        {this.props.review.review_comments.length > 0 ? (
          <div>
            <Accordion>
              <Accordion.Title
                className="linkshare_blue bold"
                active={this.state.showComments}
                onClick={this.handleClick}
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
