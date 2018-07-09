import React from "react";
import { Dropdown } from "semantic-ui-react";

class ReviewNoError extends React.Component {
  render() {
    return (
      <div id="review">
        <div className="ui medium header left linkshare_blue">Review</div>
        <div className="ui small header left">Rating</div>
        <Dropdown
          placeholder="1-10"
          fluid
          selection
          options={this.props.reviewRatingDropdownOptions}
          onChange={this.props.handleReviewRatingDropdown}
          value={this.props.reviewRating ? this.props.reviewRating : null}
        />
        <div className="ui small header left">Content</div>
        <div className="ui form">
          <div className="field">
            <textarea
              rows="2"
              onChange={this.props.handleReviewContent}
              value={this.props.reviewContent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewNoError;
