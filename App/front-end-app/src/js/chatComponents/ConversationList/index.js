import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ConversationList.css';

export default class ConversationList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     conversations: []
  //   };
  // }

  render() {
    const { matchData } = this.props;
    console.log("MATCHDATA", matchData)
    return (
      <div className="conversation-list">
        <Toolbar
          title="Matches"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          matchData.map(match => {
            return (
              <ConversationListItem
                key={match._id}
                data={match}
              />)
          }
          )
        }
      </div>
    );
  }
}

ConversationList.propTypes = {
  matchData: PropTypes.array.isRequired,
}