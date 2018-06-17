import React from "react";
import { Link, Redirect } from "react-router-dom";
import URL from "../URL";

class SignUpPage extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      usernameError: false,
      usernameErrorString: "",
      usernameVisualError: false,
      emailError: false,
      emailErrorString: "",
      emailVisualError: false,
      passwordError: false,
      passwordErrorString: "",
      passwordMatchError: false,
      usernameInput: "",
      emailInput: "",
      passwordVisualError: false,
      password1: "",
      password2: ""
    };
  }

  handleInput = e => {
    let copy = { ...this.state };
    copy[e.target.id] = e.target.value;
    this.setState(copy);
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (!(this.state.password1 === this.state.password2)) {
      this.passwordErrorFlash();
      this.setState({ passwordMatchError: true, password1: "", password2: "" });
      return;
    } else {
      this.setState({ passwordMatchError: false });
    }

    fetch(`${URL}/users/construct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameInput,
          password: this.state.password1,
          email: this.state.emailInput
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        if (json.status === "failure") {
          let usernameErrors = [];
          let emailErrors = [];
          let passwordErrors = [];
          json.errors.forEach(error => {
            if (error.includes("Username")) {
              usernameErrors.push(error);
            } else if (error.includes("Email")) {
              emailErrors.push(error);
            } else if (error.includes("Password")) {
              passwordErrors.push(error);
            }
          });

          // serialize errors
          let usernameErrorString = "";
          usernameErrors.forEach((error, index) => {
            let e = error.split(" ");
            e.shift();
            let ee = e.join(" ");
            usernameErrorString += ee;
            if (!(usernameErrors.length === index + 1)) {
              usernameErrorString += " & ";
            }
          });

          let emailErrorString = "";
          emailErrors.forEach((error, index) => {
            let e = error.split(" ");
            e.shift();
            let ee = e.join(" ");
            emailErrorString += ee;
            if (!(emailErrors.length === index + 1)) {
              emailErrorString += " & ";
            }
          });

          let passwordErrorString = "";
          passwordErrors.forEach((error, index) => {
            if (error.includes("is invalid")) {
              passwordErrorString += "needs 1 each of upcase/symbol/number";
            } else {
              let e = error.split(" ");
              e.shift();
              let ee = e.join(" ");
              passwordErrorString += ee;
            }
            if (!(passwordErrors.length === index + 1)) {
              passwordErrorString += " & ";
            }
          });

          // set state-error fields to the serialized messages & set boolean to true for each
          if (usernameErrors.length > 0) {
            this.usernameErrorFlash();
            this.setState({
              usernameErrorString,
              usernameError: true,
              password1: "",
              password2: ""
            });
          } else {
            this.setState({ usernameErrorString, usernameError: false });
          }

          if (emailErrors.length > 0) {
            this.emailErrorFlash();
            this.setState({
              emailErrorString,
              emailError: true,
              password1: "",
              password2: ""
            });
          } else {
            this.setState({ emailErrorString, emailError: false });
          }

          if (passwordErrors.length > 0) {
            this.passwordErrorFlash();
            this.setState({
              passwordErrorString,
              passwordError: true,
              password1: "",
              password2: ""
            });
          } else {
            this.setState({ passwordErrorString, passwordError: false });
          }
        } else if (json.status === "success") {
          localStorage.setItem("token", json.token);
          this.setState({ redirect: true });
          this.props.handleSignUp();
        } else {
          alert("There was an error and the request could not be processed");
        }
      });
  };

  usernameErrorFlash = () => {
    this.setState({ usernameVisualError: true }, () =>
      window.setTimeout(
        () => this.setState({ usernameVisualError: false }),
        300
      )
    );
  };

  emailErrorFlash = () => {
    this.setState({ emailVisualError: true }, () =>
      window.setTimeout(() => this.setState({ emailVisualError: false }), 300)
    );
  };

  passwordErrorFlash = () => {
    this.setState({ passwordVisualError: true }, () =>
      window.setTimeout(
        () => this.setState({ passwordVisualError: false }),
        300
      )
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
                  <div className="ui medium header centered">New Account</div>
                  <div
                    className={
                      this.state.usernameVisualError
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      id="usernameInput"
                      type="text"
                      placeholder="Username"
                      onChange={this.handleInput}
                      value={this.state.usernameInput}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="user icon" />
                  </div>
                  {this.state.usernameError ? (
                    <p className="eighth_of_em align_right error_red">
                      {this.state.usernameErrorString}
                    </p>
                  ) : (
                    <br />
                  )}

                  <div
                    className={
                      this.state.emailVisualError
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      id="emailInput"
                      type="text"
                      placeholder="Email"
                      onChange={this.handleInput}
                      value={this.state.emailInput}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="envelope icon" />
                  </div>
                  {this.state.emailError ? (
                    <p className="eighth_of_em align_right error_red">
                      {this.state.emailErrorString}
                    </p>
                  ) : (
                    <br />
                  )}

                  <div
                    className={
                      this.state.passwordVisualError
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      id="password1"
                      type="text"
                      placeholder="Password"
                      onChange={this.handleInput}
                      value={this.state.password1}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="lock icon" />
                  </div>
                  {this.state.passwordError ? (
                    <p className="eighth_of_em align_right error_red">
                      {this.state.passwordErrorString}
                    </p>
                  ) : (
                    <br />
                  )}

                  <div
                    className={
                      this.state.passwordVisualError
                        ? "ui fluid left icon input error"
                        : "ui fluid left icon input"
                    }
                  >
                    <input
                      id="password2"
                      type="text"
                      placeholder="Re-enter password"
                      onChange={this.handleInput}
                      value={this.state.password2}
                      onKeyDown={this.handleEnter}
                    />
                    <i className="lock icon" />
                  </div>
                  {this.state.passwordMatchError ? (
                    <p className="eighth_of_em align_right error_red">
                      passwords must match
                    </p>
                  ) : (
                    <br />
                  )}

                  <button
                    className="ui fluid button"
                    onClick={this.handleSubmit}
                  >
                    Sign Up
                  </button>
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
