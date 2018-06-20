import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Icon, Header } from "semantic-ui-react";
import GetStars from "./GetStars";
import URL from "../URL";

class DashboardUserSharesWidget extends React.Component {
  constructor() {
    super();

    this.state = { showComments: false };
  }

  handleClick = (e, titleProps) => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    return (
      <div>
        <Accordion>
          <Accordion.Title
            className="linkshare_blue bold"
            active={this.state.showComments}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            LinkShares ({this.props.linkshares.length})
          </Accordion.Title>
          <Accordion.Content active={this.state.showComments}>
            <div>
              {this.props.linkshares.map((linkshare, index) => {
                return (
                  <div key={linkshare.id} className="ui segment">
                    <div className="ui grid">
                      <div className="six wide column">
                        <span className="to_left bold">
                          Link:{" "}
                          <Link to={`/links/${linkshare.link.id}`}>
                            {linkshare.link.url}
                          </Link>
                        </span>
                      </div>

                      <div className="four wide column center_text">
                        <Link
                          className="star_gold"
                          to={`/linkshares/edit/${linkshare.id}`}
                        >
                          EDIT
                        </Link>
                      </div>

                      <div className="six wide column">
                        <span className="to_right bold">
                          Last Update: {linkshare.last_update.split("T")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="ui section divider divider_less_margin_top" />
                    <div className="block">
                      <span className="bold">Rating:</span>{" "}
                      <GetStars rating={linkshare.rating} /> {linkshare.rating}{" "}
                      out of 10
                    </div>
                    <br />
                    <p>
                      <span className="bold">Tags:</span>{" "}
                      <span>
                        {linkshare.tags.map(tag => (
                          <Link
                            key={tag.id}
                            className="review_tag_padding"
                            to={`/tags/${tag.id}`}
                          >
                            {tag.title}
                          </Link>
                        ))}
                      </span>
                    </p>
                    <p className="bold">Content:</p>
                    <p className="word_wrap">{linkshare.content}</p>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default DashboardUserSharesWidget;
