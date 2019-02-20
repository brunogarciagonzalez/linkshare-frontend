import React from "react";

class AboutPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui grid">
        <div className="three wide column" />

        <div className="ten wide column">
          <div className="ui segment">
            <p>
              This web application is powered by a Ruby on Rails (API), React,
              and Semantic UI.
            </p>
            <p>The concept-board for this project includes three things:</p>
            <ol>
              <li>The now-gone Yahoo! Directory,</li>
              <li>The frontpage of the internet: Reddit, and</li>
              <li>
                Amazon and Steam product reviews and review management logic
              </li>
            </ol>
            <p>
              These three concepts are fused to produce a directory of the
              internet, with admin-curated sub-directories (i.e. ‘tags’) that
              are filled with links via user-generated content. These links are
              each shared through the construction of reviews that have
              qualitative and quantitative aspects (written content and
              numerical rating, respectively).
            </p>
            <p>
              In the end, it is an attempt at ‘community-based internet
              exploration’, a term I came up with to differentiate this idea
              from crawler-based search engines as a means to navigate the
              internet. It is very similar to the original attempts at indexing
              the world wide web, with many additional features centered around
              user-generated content and extending the user experience beyond
              anchor tags.
            </p>
            <p>-- Bruno Garcia Gonzalez, June 2018</p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/garcia-gonzalez"
              >
                LinkedIn Profile
              </a>
              {" // "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/brunogarciagonzalez"
              >
                GitHub Profile
              </a>
            </p>
            <br />

            <center>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://rubyonrails.org/"
              >
                <img
                  className="about_img"
                  alt={"Rails logo"}
                  src={require(`../images/rails.png`)}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://reactjs.org/"
              >
                <img
                  className="about_img"
                  alt={"ReactJS logo"}
                  src={require(`../images/react.png`)}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://semantic-ui.com/"
              >
                <img
                  className="about_img"
                  alt={"Semantic UI logo"}
                  src={require(`../images/semantic_ui.png`)}
                />
              </a>
            </center>
            <br />
            <br />

            <p className="center_text">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/brunogarciagonzalez/linkshare-backend"
              >
                Project Back End Code
              </a>
              {" // "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/brunogarciagonzalez/linkshare-frontend"
              >
                Project Front End Code
              </a>
            </p>
          </div>
        </div>
        <div className="three wide column" />
      </div>
    );
  }
}

export default AboutPage;
