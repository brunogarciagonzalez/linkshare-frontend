import React from "react";
import { Link } from "react-router-dom";

class NavBarWidget extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <div className="four wide column vertical_align">
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

          <div className="eight wide column">
            <div className="ui secondary menu">
              <div className="item">
                <span className="bold">
                  The people’s directory for community-based internet
                  exploration
                </span>
              </div>
            </div>
          </div>

          <div className="four wide column right aligned right_navtext vertical_align">
            <div className="ui secondary menu">
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
        </div>
      </div>
    );
  }
}

export default NavBarWidget;
