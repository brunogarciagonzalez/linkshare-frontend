import React from "react";
import { Redirect } from "react-router-dom";
import LinkError from "../widgets/LinkError";
import LinkNoError from "../widgets/LinkNoError";
import TagsError from "../widgets/TagsError";
import TagsNoError from "../widgets/TagsNoError";
import ReviewError from "../widgets/ReviewError";
import ReviewNoError from "../widgets/ReviewNoError";
const URL = "http://localhost:3000";

class EditLinkSharePage extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      redirect: false,
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

    // fetch linkshare and add its data to state
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

        this.setState({
          id: user_share.id,
          linkUrl: user_share.link.url.split("//")[1],
          selectedTags: user_share.tags.map(tag => tag.title),
          reviewRating: user_share.review.rating,
          reviewContent: user_share.review.content
        });
      });
  }

  handleLinkUrl = e => {
    this.setState({ linkUrl: e.target.value });
  };

  handleTagsDropDown = (e, data) => {
    this.setState({ selectedTags: data.value }, () =>
      console.log(this.state.selectedTags)
    );
  };

  handleReviewRatingDropdown = (e, data) => {
    this.setState({ reviewRating: data.value });
  };

  handleReviewContent = e => {
    this.setState({ reviewContent: e.target.value });
  };

  handleSubmit = e => {
    // send info to the back end but it has to check all things before anything gets added to db!!!
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
        console.log("update_user_share json response:", json);
        return json;
      })
      .then(json => {
        console.log(json);
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
            redirect: true
          });
        } else {
          alert("There was an error processing your request");
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/linkshares/${this.state.id}`} />;
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
                <button className="ui fluid button" onClick={this.handleSubmit}>
                  Share
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
