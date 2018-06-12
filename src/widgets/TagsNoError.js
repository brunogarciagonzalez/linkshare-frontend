import React from "react";
import { Dropdown } from "semantic-ui-react";

class TagsNoError extends React.Component {
  render() {
    return (
      <div id="tags">
        <div className="ui medium header left linkshare_blue">Tags</div>
        <Dropdown
          placeholder="Tags"
          fluid
          multiple
          search
          selection
          options={this.props.tagDropdownOptions}
          onChange={this.props.handleTagsDropDown}
          value={this.props.selectedTags}
        />
      </div>
    );
  }
}

export default TagsNoError;
