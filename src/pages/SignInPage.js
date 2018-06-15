import React from "react";
import { Link, Redirect } from "react-router-dom";
import URL from "../URL";

class SignInPage extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      error: false,
      usernameInput: "",
      passwordInput: ""
    };
  }

  handleUsernameInput = e => {
    this.setState({ usernameInput: e.target.value });
  };

  handlePasswordInput = e => {
    this.setState({ passwordInput: e.target.value });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    // need to fetch
    // if comes back with errors, need to clear password only
    // else localStorage token and redirect to homepage
    fetch(`${URL}/users/sign_in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameInput,
          password: this.state.passwordInput
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        if (json.status === "success") {
          localStorage.setItem("token", json.token);
          this.setState({ redirect: true });
          this.props.handleNewSignIn();
        } else if (json.status === "failure") {
          this.errorFlash();
          this.setState({ passwordInput: "" });
        } else {
          alert("An error occurred");
        }
      });
  };

  errorFlash = () => {
    this.setState({ error: true }, () =>
      window.setTimeout(() => this.setState({ error: false }), 300)
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/`} />;
    }

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
                  <div
                    className={
                      this.state.error
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      value={this.state.usernameInput}
                      onChange={this.handleUsernameInput}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="user icon" />
                  </div>

                  <br />
                  <div
                    className={
                      this.state.error
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      type="text"
                      placeholder="Password"
                      value={this.state.passwordInput}
                      onChange={this.handlePasswordInput}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="lock icon" />
                  </div>

                  <p className="eighth_of_em forgot_password">
                    <Link to="/forgot-password">forgot password?</Link>
                  </p>
                  <button
                    onClick={this.handleSubmit}
                    className="ui fluid button"
                  >
                    Sign In
                  </button>
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
