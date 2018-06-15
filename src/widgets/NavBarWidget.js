import React from "react";
import { Link } from "react-router-dom";

class NavBarWidget extends React.Component {
  handleSignOut = () => {
    localStorage.removeItem("token");
    this.props.handleLogOut();
  };

  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <div className="two wide column vertical_align">
            <div className="ui secondary menu">
              <div className="item">
                <span className="bold akura logo_size">
                  <Link className={"underline"} to="/">
                    Link
                  </Link>
                  Share
                </span>
              </div>
            </div>
          </div>

          <div className="seven wide column">
            <div className="ui secondary menu">
              <div className="right menu">
                <div className="item">
                  <p className="bold align_right">
                    A people’s directory for community-based internet
                    exploration
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="seven wide column right aligned right_navtext vertical_align">
            {localStorage.token ? (
              <div className="ui secondary menu">
                <div className="right menu">
                  <div className="item">
                    <Link to="/linkshares/construct">
                      <span className="star_gold bold">New Linkshare</span>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/tags/suggest">Suggest Tag</Link>
                  </div>
                  <div className="item">
                    <Link to="/dashboard">Dashboard</Link>
                  </div>
                  <div className="item">
                    <Link to="/" onClick={this.handleSignOut}>
                      Sign Out
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/about">About</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ui secondary menu">
                <div className="right menu">
                  <div className="item">
                    <Link to="/signin">Sign In</Link>
                  </div>
                  <div className="item">
                    <Link to="/signup">Sign Up</Link>
                  </div>
                  <div className="item">
                    <Link to="/about">About</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBarWidget;
