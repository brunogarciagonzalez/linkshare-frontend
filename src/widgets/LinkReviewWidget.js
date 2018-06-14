import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Icon } from "semantic-ui-react";
import GetStars from "../widgets/GetStars";

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
        <h3 className="ui top attached header center_text">Review</h3>
        <br />
        <p>
          <span className="to_left bold">
            Author: {this.props.review.reviewer.username}
          </span>
          <span className="to_right bold">
            Last Update: {this.props.review.review.updated_at.split("T")[0]}
          </span>
        </p>

        <div class="ui section divider" />
        <div className="block">
          <span className="bold">Tags:</span>{" "}
          {this.props.review.user_share_tags.map(tag => (
            <Link className="review_tag_padding" to={`/tags/${tag.id}`}>
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
        <p>{this.props.review.review.content}</p>

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
                            Author: {comment.review_commenter.username}
                          </span>
                          <span className="to_right bold">
                            Last Update: {comment.updated_at.split("T")[0]}
                          </span>
                        </p>
                        <div class="ui section divider" />
                        <p>{comment.content}</p>
                        {!(
                          this.props.review.review_comments.length ===
                          index + 1
                        ) ? (
                          <div class="ui section divider" />
                        ) : null}
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
