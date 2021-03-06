import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBarWidget from "./widgets/NavBarWidget";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import TagDirectoryPage from "./pages/TagDirectoryPage";
import TagPage from "./pages/TagPage";
import SuggestTagPage from "./pages/SuggestTagPage";
import LinkPage from "./pages/LinkPage";
import ConstructLinkSharePage from "./pages/ConstructLinkSharePage";
import LinkSharePage from "./pages/LinkSharePage";
import EditLinkSharePage from "./pages/EditLinkSharePage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      justLoggedIn: false,
      justRegistered: false,
      justLoggedOut: false,
      justShared: false,
      justCommented: false,
      justUpdated: false,
      justDeleted: false,
      justTriedToHack: false,
      justAddedLinkToTag: false,
      justVoted: false
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

  handleLogOut = () => {
    this.setState({ justLoggedOut: true });

    window.setTimeout(() => {
      this.setState({ justLoggedOut: false });
    }, 2000);
  };

  handleNewShare = () => {
    this.setState({ justShared: true });

    window.setTimeout(() => {
      this.setState({ justShared: false });
    }, 2000);
  };

  handleNewComment = () => {
    this.setState({ justCommented: true });

    window.setTimeout(() => {
      this.setState({ justCommented: false });
    }, 2000);
  };

  handleNewUpdate = () => {
    this.setState({ justUpdated: true });

    window.setTimeout(() => {
      this.setState({ justUpdated: false });
    }, 2000);
  };

  handleNewDelete = () => {
    this.setState({ justDeleted: true });

    window.setTimeout(() => {
      this.setState({ justDeleted: false });
    }, 2000);
  };

  handleNewReviewVote = () => {
    this.setState({ justVoted: true });

    window.setTimeout(() => {
      this.setState({ justVoted: false });
    }, 2000);
  };

  handleHackAttempt = () => {
    this.setState({ justTriedToHack: true });

    window.setTimeout(() => {
      this.setState({ justTriedToHack: false });
    }, 2000);
  };

  handleNewLinkForTag = () => {
    this.setState({ justAddedLinkToTag: true });

    window.setTimeout(() => {
      this.setState({ justAddedLinkToTag: false });
    }, 2000);
  };

  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <div>
          <NavBarWidget
            handleLogOut={this.handleLogOut}
            handleNewShare={this.handleNewShare}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  justLoggedIn={this.state.justLoggedIn}
                  justRegistered={this.state.justRegistered}
                  justLoggedOut={this.state.justLoggedOut}
                  justTriedToHack={this.state.justTriedToHack}
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
            <Route exact path="/users/:UserID" component={UserPage} />
            <Route
              exact
              path="/dashboard"
              render={() => (
                <DashboardPage justDeleted={this.state.justDeleted} />
              )}
            />
            <Route exact path="/tags" component={TagDirectoryPage} />
            <Route exact path="/tags/suggest" component={SuggestTagPage} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPasswordPage}
            />
            <Route
              exact
              path="/tags/:TagID"
              render={({ match }) => (
                <TagPage
                  handleNewLinkForTag={this.handleNewLinkForTag}
                  justAddedLinkToTag={this.state.justAddedLinkToTag}
                  match={match}
                />
              )}
            />
            <Route
              exact
              path="/links/:LinkID"
              render={({ match }) => (
                <LinkPage
                  handleNewShare={this.handleNewShare}
                  handleNewComment={this.handleNewComment}
                  justCommented={this.state.justCommented}
                  handleNewReviewVote={this.handleNewReviewVote}
                  justVoted={this.state.justVoted}
                  match={match}
                />
              )}
            />
            <Route
              exact
              path="/linkshares/construct"
              component={ConstructLinkSharePage}
            />
            <Route
              exact
              path="/linkshares/edit/:shareID"
              render={({ match }) => (
                <EditLinkSharePage
                  handleNewUpdate={this.handleNewUpdate}
                  handleNewDelete={this.handleNewDelete}
                  handleHackAttempt={this.handleHackAttempt}
                  match={match}
                />
              )}
            />
            <Route
              exact
              path="/linkshares/:shareID"
              render={({ match }) => (
                <LinkSharePage
                  match={match}
                  justShared={this.state.justShared}
                  justUpdated={this.state.justUpdated}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
