import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Icon } from "semantic-ui-react";

class DashboardUserShareCommentsWidget extends React.Component {
  constructor() {
    super();

    this.state = { showComments: false };
  }

  handleClick = (e, titleProps) => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    return (
      <div>
        <Accordion>
          <Accordion.Title
            className="linkshare_blue bold"
            active={this.state.showComments}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Comments ({this.props.linkshare.review_comments.length})
          </Accordion.Title>
          <Accordion.Content active={this.state.showComments}>
            <div>
              {this.props.linkshare.review_comments.map((comment, index) => {
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
    );
  }
}

export default DashboardUserShareCommentsWidget;
