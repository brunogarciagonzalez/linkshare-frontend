import React from "react";
import TagLinkCard from "../widgets/TagLinkCard";

class TagPageLinksTab extends React.Component {
  render() {
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

// <div className="image">
//   <img
//     src={link.preview.image}
//     alt={link.preview.title}
//     />
// </div>
