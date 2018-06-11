import React from "react";
import { Link } from "react-router-dom";

class SignInPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="ui grid">
          <div className="five wide column" />
          <div className="six wide column">
            <div className="ui segment">
              <div className="ui grid">
                <div className="three wide column" />

                <div className="ten wide column">
                  <div className="ui medium header centered">User Login</div>
                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Username" />
                    <i className="user icon" />
                  </div>

                  <br />
                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Password" />
                    <i className="lock icon" />
                  </div>

                  <p className="eighth_of_em forgot_password">
                    <Link to="/forgot-password">forgot password?</Link>
                  </p>
                  <button className="ui fluid button">Sign In</button>
                  <br />
                  <p className="eighth_of_em center_text">
                    Not a member? <Link to="/signup">Sign up!</Link>
                  </p>
                  <div className="three wide column" />
                </div>
              </div>
            </div>
          </div>
          <div className="five wide column" />
        </div>
      </div>
    );
  }
}

export default SignInPage;
