import React from "react";
import { Tab } from "semantic-ui-react";
import SafeBrowsingAPIKey from "../SafeBrowsingAPIKey";
import LinkPreviewAPIKey from "../LinkPreviewAPIKey";
import TagPageLinksTab from "../widgets/TagPageLinksTab";
import TagPageCommentsTab from "../widgets/TagPageCommentsTab";
import NewLinkForTagModal from "../widgets/NewLinkForTagModal";
import URL from "../URL";

class TagPage extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      title: null,
      links: []
    };
  }

  fetcher = () => {
    fetch(`${URL}/links/for_tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ tag: { id: this.props.match.params.TagID } })
    })
      .then(r => r.json())
      .then(json => {
        this.setState({
          id: json.tag.id,
          title: json.tag.title,
          links: json.links
        });
      })
      .then(meh => {
        let serialized_links = this.state.links.map(linkObj => ({
          url: linkObj.link.url
        }));

        fetch(
          `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${SafeBrowsingAPIKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client: { clientId: "LinkShare", clientVersion: "1.0.0" },
              threatInfo: {
                threatTypes: [
                  "MALWARE",
                  "THREAT_TYPE_UNSPECIFIED",
                  "SOCIAL_ENGINEERING",
                  "UNWANTED_SOFTWARE",
                  "POTENTIALLY_HARMFUL_APPLICATION"
                ],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: [
                  "URL",
                  "EXECUTABLE",
                  "THREAT_ENTRY_TYPE_UNSPECIFIED"
                ],
                threatEntries: serialized_links
              }
            })
          }
        )
          .then(r => r.json())
          .then(console.log);
      })
      .then(meh => {
        this.state.links.forEach((linkObj, index) => {
          fetch(
            `http://api.linkpreview.net/?key=${LinkPreviewAPIKey}&q=${
              linkObj.link.url
            }`
          )
            .then(r => r.json())
            .then(json => {
              let linksCopy = [...this.state.links];
              linksCopy[index]["loaded"] = true;
              linksCopy[index]["preview"] = {};
              linksCopy[index]["preview"]["image"] = json.image;
              linksCopy[index]["preview"]["title"] = json.title;
              linksCopy[index]["preview"]["description"] = json.description;

              this.setState(
                {
                  links: linksCopy
                },
                () => console.log(index, linkObj.link.url, "state:", this.state)
              );
            });
        });
      })
      .then(a => console.log("final state:", this.state));
  };

  componentDidMount() {
    this.fetcher();
  }

  handleNewLinkForCurrentTag = () => {
    this.fetcher();
    this.props.handleNewLinkForTag();
  };

  render() {
    const panes = [
      {
        menuItem: { key: "links", icon: "laptop", content: "Links" },
        render: () => (
          <Tab.Pane>
            <TagPageLinksTab
              handleNewLinkForTag={this.handleNewLinkForCurrentTag}
              tagID={this.state.id}
              tagTitle={this.state.title}
              links={this.state.links}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: { key: "messages", icon: "users", content: "Discussion" },
        render: () => (
          <Tab.Pane>
            <TagPageCommentsTab />
          </Tab.Pane>
        )
      }
    ];

    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">
              Tag: <span className="linkshare_blue">{this.state.title}</span>
            </div>
            {localStorage.getItem("token") ? (
              <div>
                <br />
                <div className="center_text">
                  <NewLinkForTagModal
                    handleNewLinkForTag={this.handleNewLinkForCurrentTag}
                    tagID={this.state.id}
                    tagTitle={this.state.title}
                    onTagPage={true}
                  />
                </div>
              </div>
            ) : null}
            <div className="ui section divider" />

            <Tab panes={panes} />
          </div>
          <div className="three wide column">
            {this.props.justAddedLinkToTag ? (
              <div className="ui yellow compact message">
                <div className="header">Link Added!</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default TagPage;
