import React from "react";
import { Link } from "react-router-dom";

class SignUpPage extends React.Component {
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
                  <div className="ui medium header centered">New Account</div>
                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Username" />
                    <i className="user icon" />
                  </div>

                  <br />

                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Email" />
                    <i className="envelope icon" />
                  </div>

                  <br />
                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Password" />
                    <i className="lock icon" />
                  </div>
                  <br />

                  <div className="ui fluid left icon input">
                    <input type="text" placeholder="Re-enter password" />
                    <i className="lock icon" />
                  </div>
                  <br />

                  <button class="ui fluid button">Sign Up</button>
                  <br />
                  <p className="eighth_of_em center_text">
                    Already a member? <Link to="/signin">Sign in!</Link>
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

export default SignUpPage;
