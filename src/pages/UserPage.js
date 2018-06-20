import React from "react";
import URL from "../URL";
import UserPageUserSharesWidget from "../widgets/UserPageUserSharesWidget";

class UserPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      username: null,
      memberSince: null,
      linkshareCount: null,
      linkshares: [],
      reviewCommentCount: null,
      tagCommentCount: null
    };
  }

  loadLagger = () => {
    window.setTimeout(() => this.setState({ loaded: true }), 400);
  };

  componentDidMount() {
    fetch(`${URL}/users/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: { id: this.props.match.params.UserID } })
    })
      .then(r => r.json())
      .then(json => {
        this.setState(
          {
            username: json.user.username,
            memberSince: json.user.created_at.split("T")[0],
            linkshareCount: json.linkshares.length,
            linkshares: json.linkshares,
            reviewCommentCount: json.num_review_comments,
            tagCommentCount: json.num_tag_comments
          },
          () => this.loadLagger()
        );
      });
  }

  getMonth = num => {
    switch (num) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  };

  render() {
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />

          <div className="ten wide column">
            {this.state.loaded ? (
              <div className="ui segment">
                <div className="ui large header centered">
                  User:{" "}
                  <span className="linkshare_blue">{this.state.username}</span>
                </div>
                <div className="ui section divider divider_less_margin_top" />
                <div className="center_text">
                  <div className="ui statistic inline center_inline">
                    <div className="value">
                      <i className="star_gold share square icon" />{" "}
                      {this.state.linkshareCount}
                    </div>
                    <div className="label">LinkShares</div>
                  </div>
                  <div className="ui statistic inline center_inline">
                    <div className="value">
                      <i className="star_gold comment alternate outline icon" />{" "}
                      {this.state.reviewCommentCount}
                    </div>
                    <div className="label">
                      Review <br />Comments
                    </div>
                  </div>
                  <div className="ui statistic">
                    <div className="value">
                      <i className="star_gold comments icon" />{" "}
                      {this.state.tagCommentCount}
                    </div>
                    <div className="label">
                      Tag Discussion <br />Comments
                    </div>
                  </div>
                  <br />
                  <div className="ui section divider" />
                </div>
                <UserPageUserSharesWidget linkshares={this.state.linkshares} />
              </div>
            ) : (
              <div className="ui active centered loader loader_push_down" />
            )}
          </div>
          <div className="three wide column">
            {this.props.justDeleted ? (
              <div className="ui yellow compact message">
                <div className="header">Deletion Successful!</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;

// <div className="ui statistic inline center_inline">
//   <div className="label">Member Since</div>
//   <div className="text value linkshare_blue">
//     {this.state.memberSince.split("-")[2]}{" "}
//     {this.getMonth(this.state.memberSince.split("-")[1])}
//     <br />
//     {this.state.memberSince.split("-")[0]}
//   </div>
// </div>
