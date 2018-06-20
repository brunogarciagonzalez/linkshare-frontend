import React from "react";
import TagLinkCard from "../widgets/TagLinkCard";
import NewLinkForTagModal from "../widgets/NewLinkForTagModal";

class TagPageLinksTab extends React.Component {
  render() {
    if (this.props.links.length === 0) {
      return (
        <div>
          No links yet!{"   "}
          <NewLinkForTagModal
            handleNewLinkForTag={this.props.handleNewLinkForTag}
            tagID={this.props.tagID}
            tagTitle={this.props.tagTitle}
          />
        </div>
      );
    }
    return (
      <div className="ui cards">
        {this.props.links.map(link => {
          return link.loaded ? (
            <TagLinkCard key={link.link.id} link={link} />
          ) : (
            <div className="card" key={link.link.id}>
              <div className="ui active centered inline loader" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default TagPageLinksTab;
