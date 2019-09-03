import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

import AddLinesPanel from '../AddLinesPanel'

import PropTypes from 'prop-types';

export default class Messenger extends Component {
  render() {
    const { matchData, selectMatch, selectedMatch, matchMessages, matchLines, selectLine } = this.props;
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList matchData={matchData} selectMatch={selectMatch} />
        </div>

        <div className="scrollable content">
          <MessageList matchMessages={matchMessages} selectedMatch={selectedMatch} selectLine={selectLine} />
        </div>
        <div className="content">
          <AddLinesPanel selectedMatch={selectedMatch} matchLines={matchLines} selectLine={selectLine} />
        </div>
      </div>
    );
  }
}

Messenger.propTypes = {
  matchData: PropTypes.array.isRequired,
  selectMatch: PropTypes.func.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  matchMessages: PropTypes.object.isRequired,
  matchLines: PropTypes.object.isRequired,
  selectLine: PropTypes.func.isRequired,
}