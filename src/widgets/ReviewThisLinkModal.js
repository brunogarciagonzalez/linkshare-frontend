import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import LinkError from "../widgets/LinkError";
import LinkNoError from "../widgets/LinkNoError";
import TagsError from "../widgets/TagsError";
import TagsNoError from "../widgets/TagsNoError";
import ReviewError from "../widgets/ReviewError";
import ReviewNoError from "../widgets/ReviewNoError";
import URL from "../URL";

class ReviewThisLinkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      redirect: false,
      redirect_to_id: null,
      tagDropdownOptions: [],
      reviewRatingDropdownOptions: [],
      linkUrl: this.props.link.split("//")[1],
      selectedTags: [],
      reviewContent: "",
      reviewRating: null,
      linkErrors: [],
      tagError: null,
      reviewErrors: []
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () =>
    this.setState({
      modalOpen: false,
      redirect: false,
      redirect_to_id: null,
      tagDropdownOptions: [],
      reviewRatingDropdownOptions: [],
      linkUrl: this.props.link.split("//")[1],
      selectedTags: [],
      reviewContent: "",
      reviewRating: null,
      linkErrors: [],
      tagError: null,
      reviewErrors: []
    });

  componentDidMount() {
    fetch(`${URL}/tags`)
      .then(r => r.json())
      .then(json => {
        let tagDDOptions = json.tags.map(tag => {
          return { key: tag.id, value: tag.title, text: tag.title };
        });

        let reviewRatingDDOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
          return { key: num, value: num, text: num };
        });

        this.setState({
          tagDropdownOptions: tagDDOptions,
          reviewRatingDropdownOptions: reviewRatingDDOptions
        });
      });
  }

  handleLinkUrl = e => {
    this.setState({ linkUrl: e.target.value });
  };

  handleTagsDropDown = (e, data) => {
    this.setState({ selectedTags: data.value });
  };

  handleReviewRatingDropdown = (e, data) => {
    this.setState({ reviewRating: data.value });
  };

  handleReviewContent = e => {
    this.setState({ reviewContent: e.target.value });
  };

  handleSubmit = e => {
    fetch(`${URL}/user-shares/construct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_share: {
          token: localStorage.getItem("token"),
          review_information: {
            content: this.state.reviewContent,
            rating: this.state.reviewRating
          },
          link_information: { url: this.state.linkUrl },
          tags: this.state.selectedTags
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        if (json.status === "failure") {
          let linkErrors = json.link_errors;
          let reviewErrors = json.review_errors;
          let tagError;

          if (this.state.selectedTags.length === 0) {
            tagError = true;
          } else {
            tagError = false;
          }

          this.setState({
            tagError,
            linkErrors,
            reviewErrors
          });
        } else if (json.status === "success") {
          this.setState(
            {
              redirect_to_id: json.user_share_id,
              redirect: true,
              modalOpen: false
            },
            () => this.setState({ redirect: false })
          );
          this.props.handleNewShare();
        } else {
          alert("There was an error processing your request");
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/linkshares/${this.state.redirect_to_id}`} />;
    }
    return (
      <Modal
        trigger={
          <div>
            <Button
              primary
              className="custom_modal star_gold_background"
              onClick={this.handleOpen}
            >
              Review This Link
            </Button>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        centered={false}
        size="large"
        closeIcon
      >
        <Modal.Header className="center_text">New LinkShare</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <div>
              {this.state.linkErrors.length > 0 ? (
                <LinkError
                  linkUrl={this.state.linkUrl}
                  handleLinkUrl={this.handleLinkUrl}
                />
              ) : (
                <LinkNoError
                  linkUrl={this.state.linkUrl}
                  handleLinkUrl={this.handleLinkUrl}
                />
              )}
              <br />

              {this.state.tagError ? (
                <TagsError
                  tagDropdownOptions={this.state.tagDropdownOptions}
                  handleTagsDropDown={this.handleTagsDropDown}
                  selectedTags={this.state.selectedTags}
                />
              ) : (
                <TagsNoError
                  tagDropdownOptions={this.state.tagDropdownOptions}
                  handleTagsDropDown={this.handleTagsDropDown}
                  selectedTags={this.state.selectedTags}
                />
              )}
              <br />

              {this.state.reviewErrors.length > 0 ? (
                <ReviewError
                  reviewRatingDropdownOptions={
                    this.state.reviewRatingDropdownOptions
                  }
                  handleReviewRatingDropdown={this.handleReviewRatingDropdown}
                  handleReviewContent={this.handleReviewContent}
                  reviewContent={this.state.reviewContent}
                  reviewRating={this.state.reviewRating}
                />
              ) : (
                <ReviewNoError
                  reviewRatingDropdownOptions={
                    this.state.reviewRatingDropdownOptions
                  }
                  handleReviewRatingDropdown={this.handleReviewRatingDropdown}
                  handleReviewContent={this.handleReviewContent}
                  reviewContent={this.state.reviewContent}
                  reviewRating={this.state.reviewRating}
                />
              )}
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

export default ReviewThisLinkModal;
