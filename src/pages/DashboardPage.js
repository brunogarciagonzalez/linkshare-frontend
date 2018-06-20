import React from "react";
import URL from "../URL";
import DashboardUserSharesWidget from "../widgets/DashboardUserSharesWidget";
import { Redirect } from "react-router-dom";

class DashboardPage extends React.Component {
  constructor() {
    super();

    this.state = {
      notLoggedIn: false,
      loaded: false,
      username: null,
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
    if (!localStorage.getItem("token")) {
      this.setState({ notLoggedIn: true });
      return;
    }
    fetch(`${URL}/users/get_dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: { token: localStorage.getItem("token") } })
    })
      .then(r => r.json())
      .then(json => {
        this.setState(
          {
            username: json.user.username,
            linkshareCount: json.linkshares.length,
            linkshares: json.linkshares,
            reviewCommentCount: json.num_review_comments,
            tagCommentCount: json.num_tag_comments
          },
          () => this.loadLagger()
        );
      });
  }

  render() {
    if (this.state.notLoggedIn) {
      return <Redirect push to={`/signin`} />;
    }
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />

          <div className="ten wide column">
            {this.state.loaded ? (
              <div className="ui segment">
                <div className="ui large header centered">Your Dashboard</div>
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
                <DashboardUserSharesWidget linkshares={this.state.linkshares} />
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

export default DashboardPage;

// <div class="statistic">
//   <div class="value">
//     <img
//       src="/images/avatar/small/joe.jpg"
//       class="ui circular inline image"
//       />
//     42
//   </div>
//   <div class="label">Team Members</div>
// </div>
