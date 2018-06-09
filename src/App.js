import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import NavBarWidget from "./widgets/NavBarWidget";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import TagDirectoryPage from "./pages/TagDirectoryPage";
import TagPage from "./pages/TagPage";
import SuggestTagPage from "./pages/TagPage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBarWidget />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/tags" component={TagDirectoryPage} />
          <Route exact path="/tags/:TagID" component={TagPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
