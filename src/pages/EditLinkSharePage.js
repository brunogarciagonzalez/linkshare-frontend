import React from "react";
import { Redirect } from "react-router-dom";
import LinkError from "../widgets/LinkError";
import LinkNoError from "../widgets/LinkNoError";
import TagsError from "../widgets/TagsError";
import TagsNoError from "../widgets/TagsNoError";
import ReviewError from "../widgets/ReviewError";
import ReviewNoError from "../widgets/ReviewNoError";
import URL from "../URL";

class EditLinkSharePage extends React.Component {
  constructor() {
    super();

    this.state = {
      notLoggedIn: false,
      wrongUser: false,
      id: null,
      redirectToShow: false,
      redirectToDashboard: false,
      tagDropdownOptions: [],
      reviewRatingDropdownOptions: [],
      linkUrl: "",
      selectedTags: [],
      reviewContent: "",
      reviewRating: null,
      linkErrors: [],
      tagError: null,
      reviewErrors: []
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ notLoggedIn: true });
      return;
    }
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
        let user_share = json.user_share;

        if (user_share.user.id !== json.current_user_id) {
          this.setState({ wrongUser: true });
          this.props.handleHackAttempt();
        } else {
          this.setState({
            id: user_share.id,
            linkUrl: user_share.link.url.split("//")[1],
            selectedTags: user_share.tags.map(tag => tag.title),
            reviewRating: user_share.review.rating,
            reviewContent: user_share.review.content
          });
        }
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
    fetch(`${URL}/user-shares/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_share: {
          id: this.state.id,
          token:
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.ETUYUOkmfnWsWIvA8iBOkE2s1ZQ0V_zgnG_c4QRrhbg",
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
          this.setState({
            redirectToShow: true
          });
          this.props.handleNewUpdate();
        } else {
          alert("There was an error processing your request");
        }
      });
  };

  handleDelete = () => {
    fetch(`${URL}/user-shares/destroy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_share: { id: this.state.id } })
    })
      .then(r => r.json())
      .then(meh => {
        this.setState({ redirectToDashboard: true });
        this.props.handleNewDelete();
      });
  };

  render() {
    if (this.state.notLoggedIn) {
      return <Redirect push to={`/signin`} />;
    }
    if (this.state.wrongUser) {
      return <Redirect push to={`/`} />;
    }
    if (this.state.redirectToShow) {
      return <Redirect push to={`/linkshares/${this.state.id}`} />;
    }
    if (this.state.redirectToDashboard) {
      return <Redirect push to={`/dashboard`} />;
    }
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">Edit LinkShare</div>

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
            <br />
            <br />
            <div className="ui grid">
              <div className="five wide column" />
              <div className="six wide column">
                <button
                  className="ui fluid button primary"
                  onClick={this.handleSubmit}
                >
                  Update
                </button>
                <br />
                <button
                  className="ui fluid button delete_button"
                  onClick={this.handleDelete}
                >
                  Delete
                </button>
              </div>
              <div className="five wide column" />
            </div>
          </div>
          <div className="three wide column" />
        </div>

        <div className="ui grid" />
      </div>
    );
  }
}

export default EditLinkSharePage;
