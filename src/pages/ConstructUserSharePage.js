import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const URL = "http://localhost:3000/";

class ConstructUserSharePage extends React.Component {
  constructor() {
    super();

    this.state = {
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
  }
  handleLinkUrl = e => {
    this.setState({ linkUrl: e.target.value });
  };

  handleTagsDropDown = (e, data) => {
    this.setState({ selectedTags: data.value }, () =>
      console.log("state.selectedTags:", this.state.selectedTags)
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
    fetch(`${URL}/user-shares/construct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_share: {
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
        console.log("construct_share json response:", json);
        return json;
      })
      .then(json => {
        if (json.status === "failure") {
          let linkErrors = json.link_errors;
          let reviewErrors = json.review_errors;
          let tagError;

          if (this.state.selectedTags.length === 0) {
            tagError = true;
          }

          this.setState({
            tagError,
            linkErrors,
            reviewErrors
          });
        } else {
          this.setState({
            redirect: true
          });
        }
      });
    // remember to clear all fields
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">New LinkShare</div>

            {this.state.linkErrors.length > 0 ? (
              <div id="link">
                <div className="ui medium header left linkshare_blue">Link</div>
                <div className="ui fluid labeled input error">
                  <div className="ui label">needs http://</div>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={this.state.linkUrl}
                    onChange={this.handleLinkUrl}
                  />
                </div>
              </div>
            ) : (
              <div id="link">
                <div className="ui medium header left linkshare_blue">Link</div>
                <div className="ui fluid labeled input">
                  <div className="ui label">needs http://</div>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={this.state.linkUrl}
                    onChange={this.handleLinkUrl}
                  />
                </div>
              </div>
            )}
            <br />

            {this.state.tagError ? (
              <div id="tags">
                <div className="ui medium header left linkshare_blue">Tags</div>
                <Dropdown
                  placeholder="Tags"
                  fluid
                  multiple
                  search
                  selection
                  options={this.state.tagDropdownOptions}
                  onChange={this.handleTagsDropDown}
                  error
                />
              </div>
            ) : (
              <div id="tags">
                <div className="ui medium header left linkshare_blue">Tags</div>
                <Dropdown
                  placeholder="Tags"
                  fluid
                  multiple
                  search
                  selection
                  options={this.state.tagDropdownOptions}
                  onChange={this.handleTagsDropDown}
                />
              </div>
            )}
            <br />

            {this.state.reviewErrors.length > 0 ? (
              <div id="review">
                <div className="ui medium header left linkshare_blue">
                  Review
                </div>
                <div className="ui small header left">Rating</div>
                <Dropdown
                  placeholder="1-10"
                  fluid
                  selection
                  options={this.state.reviewRatingDropdownOptions}
                  onChange={this.handleReviewRatingDropdown}
                  error
                />
                <div className="ui small header left">Content</div>
                <div className="ui form error">
                  <div className="field">
                    <textarea
                      rows="5"
                      onChange={this.handleReviewContent}
                      value={this.state.reviewContent}
                      className="custom_error"
                    />
                  </div>
                </div>
                {this.state.reviewContent.length < 240 ? (
                  <div className="eighth_of_em">
                    <p>
                      <span className="review_characters_right review_characters_not_met">
                        Atleast {240 - this.state.reviewContent.length} more
                        characters
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="eighth_of_em">
                    <p>
                      <span className="review_characters_right review_characters_met">
                        Nice, Character requirement met!
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div id="review">
                <div className="ui medium header left linkshare_blue">
                  Review
                </div>
                <div className="ui small header left">Rating</div>
                <Dropdown
                  placeholder="1-10"
                  fluid
                  selection
                  options={this.state.reviewRatingDropdownOptions}
                  onChange={this.handleReviewRatingDropdown}
                />
                <div className="ui small header left">Content</div>
                <div className="ui form">
                  <div className="field">
                    <textarea
                      rows="5"
                      onChange={this.handleReviewContent}
                      value={this.state.reviewContent}
                    />
                  </div>
                </div>
                {this.state.reviewContent.length < 240 ? (
                  <div className="eighth_of_em">
                    <p>
                      <span className="review_characters_right review_characters_not_met">
                        Atleast {240 - this.state.reviewContent.length} more
                        characters
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="eighth_of_em">
                    <p>
                      <span className="review_characters_right review_characters_met">
                        Nice, Character requirement met!
                      </span>
                    </p>
                  </div>
                )}
              </div>
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

export default ConstructUserSharePage;
