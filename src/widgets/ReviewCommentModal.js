import React from "react";
import { Button, Modal } from "semantic-ui-react";
import URL from "../URL";

class ReviewCommentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      redirect: false,
      content: "",
      contentError: false
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () =>
    this.setState({
      modalOpen: false,
      content: "",
      contentError: false
    });

  handleContent = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    fetch(`${URL}/review-comments/construct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        review_comment: {
          token: localStorage.getItem("token"),
          review_id: this.props.reviewID,
          content: this.state.content
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        if (json.status === "failure") {
          this.setState({ contentError: true });
        } else if (json.status === "success") {
          this.handleClose();
          this.props.handleNewComment();
        } else {
          alert("There was an error processing your request");
        }
      });
  };

  render() {
    return (
      <Modal
        trigger={
          <span
            className="linkshare_blue custom_modal"
            onClick={this.handleOpen}
          >
            + Comment
          </span>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        centered={false}
        size="small"
        closeIcon
      >
        <Modal.Header className="center_text">New Review Comment</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>
              <div className="ui medium header left linkshare_blue">
                Content
              </div>
              <div className="ui form">
                <div className="field">
                  <textarea
                    rows="3"
                    onChange={this.handleContent}
                    value={this.props.content}
                    className={this.state.contentError ? "custom_error" : ""}
                  />
                  {this.state.contentError ? (
                    <p className="eighth_of_em align_right error_red">
                      content can't be blank
                    </p>
                  ) : null}
                </div>
              </div>
              <br />
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSubmit}>
            Share
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ReviewCommentModal;
