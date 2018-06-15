import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBarWidget from "./widgets/NavBarWidget";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import TagDirectoryPage from "./pages/TagDirectoryPage";
import TagPage from "./pages/TagPage";
import SuggestTagPage from "./pages/SuggestTagPage";
import LinkPage from "./pages/LinkPage";
import ConstructLinkSharePage from "./pages/ConstructLinkSharePage";
import LinkSharePage from "./pages/LinkSharePage";
import EditLinkSharePage from "./pages/EditLinkSharePage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      justLoggedIn: false,
      justRegistered: false
    };
  }

  handleNewSignIn = () => {
    this.setState({ justLoggedIn: true });

    window.setTimeout(() => {
      this.setState({ justLoggedIn: false });
    }, 2000);
  };

  handleSignUp = () => {
    this.setState({ justRegistered: true });

    window.setTimeout(() => {
      this.setState({ justRegistered: false });
    }, 2000);
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBarWidget />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  justLoggedIn={this.state.justLoggedIn}
                  justRegistered={this.state.justRegistered}
                />
              )}
            />;
            <Route
              exact
              path="/signin"
              render={() => (
                <SignInPage handleNewSignIn={this.handleNewSignIn} />
              )}
            />;
            <Route
              exact
              path="/signup"
              render={() => <SignUpPage handleSignUp={this.handleSignUp} />}
            />;
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/tags" component={TagDirectoryPage} />
            <Route exact path="/tags/suggest" component={SuggestTagPage} />
            <Route exact path="/tags/:TagID" component={TagPage} />
            <Route exact path="/links/:LinkID" component={LinkPage} />
            <Route
              exact
              path="/linkshares/construct"
              component={ConstructLinkSharePage}
            />
            <Route
              exact
              path="/linkshares/edit/:shareID"
              component={EditLinkSharePage}
            />
            <Route
              exact
              path="/linkshares/:shareID"
              component={LinkSharePage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
//
// <Route
//   exact
//   path="/construct-linkshare"
//   render={() => <ConstructLinkSharePage allTags={this.state.allTags} />}
// />;
