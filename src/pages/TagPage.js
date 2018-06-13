import React from "react";
import SafeBrowsingAPIKey from "../SafeBrowsingAPIKey";
import LinkPreviewAPIKey from "../LinkPreviewAPIKey";
import TagLinkCard from "../widgets/TagLinkCard";
const URL = "http://localhost:3000";

class TagPage extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      title: null,
      links: []
    };
  }

  componentDidMount() {
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
        // serialize links into a copy
        console.log("state:::", this.state);
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
  }

  render() {
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column" />
          <div className="ten wide column">
            <div className="ui large header centered">
              Tag: <span className="linkshare_blue">{this.state.title}</span>
            </div>
            <br />
            <br />
            <div className="ui cards">
              {this.state.links.map(link => {
                return link.loaded ? (
                  <TagLinkCard link={link} />
                ) : (
                  <div className="card" key={link.link.id}>
                    <div className="ui active centered inline loader" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="three wide column" />
        </div>
      </div>
    );
  }
}

export default TagPage;

// <div className="image">
//   <img
//     src={link.preview.image}
//     alt={link.preview.title}
//     />
// </div>
