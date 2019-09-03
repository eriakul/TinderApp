import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ConversationListItem.css';

export default class ConversationListItem extends Component {

  shortenMessage(message) {
    if (message.length > 50) {
      return `${message.slice(0, 47)}...`
    }
    return message
  }

  render() {
    const { photo, name, message } = this.props.data;
    const { selectMatch } = this.props;

    return (
      <div className="conversation-list-item" onClick={() => selectMatch(this.props.data)}>
        <img className="conversation-photo" src={photo} alt="" />
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          <p className="conversation-snippet">{this.shortenMessage(message)}</p>
        </div>
      </div>
    );
  }
}

ConversationListItem.propTypes = {
  data: PropTypes.object.isRequired,
  selectMatch: PropTypes.func.isRequired
}