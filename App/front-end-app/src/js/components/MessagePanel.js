import React, { Component } from 'react';
import TextingBar from './TextingBar'
import ChatWindow from './ChatWindow'
// import moment from 'moment';
import PropTypes from 'prop-types';
import '../../TinderApp.css';

export default class MessageList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     messages: []
  //   };
  // }


  render() {
    const { selectedMatch, matchMessages, selectedLine, sendMessageToTinder, sendMessageStatus } = this.props;


    return (
      <div className="round-container">
        <ChatWindow sendMessageStatus={sendMessageStatus} matchMessages={matchMessages.value} selectedMatch={selectedMatch} matchMessagesStatus={matchMessages.requestStatus} ></ChatWindow>
        <TextingBar selectedLine={selectedLine} sendMessageToTinder={sendMessageToTinder}></TextingBar>
      </div>
    );
  }
}

MessageList.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  matchMessages: PropTypes.object.isRequired,
  selectedLine: PropTypes.string.isRequired,
  sendMessageToTinder: PropTypes.func.isRequired,
  sendMessageStatus:PropTypes.object.isRequired, 

}