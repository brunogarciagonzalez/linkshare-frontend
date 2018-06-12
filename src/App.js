import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import NavBarWidget from "./widgets/NavBarWidget";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import TagDirectoryPage from "./pages/TagDirectoryPage";
import TagPage from "./pages/TagPage";
import SuggestTagPage from "./pages/TagPage";
import ConstructLinkSharePage from "./pages/ConstructLinkSharePage";
import LinkSharePage from "./pages/LinkSharePage";
import EditLinkSharePage from "./pages/EditLinkSharePage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  // componentDidMount() {
  //   // fetch all tags
  //   fetch(`${URL}/tags`)
  //     .then(r => r.json())
  //     .then(json => {
  //       this.setState({ allTags: json.tags });
  //     });
  // }

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
          <Route exact path="/tags/show/:TagID" component={TagPage} />
          <Route exact path="/tags/suggest" component={SuggestTagPage} />
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
          <Route exact path="/linkshares/:shareID" component={LinkSharePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <Route
//   exact
//   path="/construct-linkshare"
//   render={() => <ConstructLinkSharePage allTags={this.state.allTags} />}
// />;
