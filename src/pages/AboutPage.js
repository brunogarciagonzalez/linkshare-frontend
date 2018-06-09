import React from "react";

class AboutPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>About Page</h1>
        <h1>App Vision: some new ideas</h1>
        <p>Safe Browsing Check</p>
        <ul>
          <li>
            <a
              href="https://developers.google.com/safe-browsing/v3/lookup-guide#ProtocolSpecification"
              target="_blank"
            >
              Google Safe Browsing Api
            </a>
          </li>
          <li>
            <a href="https://safeweb.norton.com/" target="_blank">
              Norton Safe Web
            </a>
          </li>
        </ul>
        <p>Twitter API idea</p>
        <ul>
          <li>In order to bring users to the app / populate the database</li>
          <li>
            potential Twitter integration where people can send reviews via some
            twitter format to the 'linkshare' twitter via DMs
          </li>
          <li>
            the software could connect to the twitter api and log in as
            'linkshare'
          </li>
          <li>
            {" "}
            and produce a user_share via some formatting / parsing of the DM
            text
          </li>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
