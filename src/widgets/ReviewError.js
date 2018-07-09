import React from "react";
import { Dropdown } from "semantic-ui-react";

class ReviewError extends React.Component {
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
          value={this.props.reviewRating}
          error
        />
        <div className="ui small header left">Content</div>
        <div className="ui form error">
          <div className="field">
            <textarea
              rows="2"
              onChange={this.props.handleReviewContent}
              value={this.props.reviewContent}
              className="custom_error"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewError;
