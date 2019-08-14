import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import RequestStatus from '../../static/RequestStatus'
import PropTypes from 'prop-types';
import ChatBubble from './ChatBubble'
import NoSelectedMatch from './imgs/noMatchSelected.jpg'
import '../../TinderApp.css';


export default class ChatWindow extends Component {
    renderMessages({ matchMessages, selectedMatch, matchMessagesStatus, sendMessageStatus }) {

        if (!selectedMatch) {
            return <img className="nomatchimg" src={NoSelectedMatch} alt="" />
        }
        if (matchMessagesStatus === RequestStatus.PENDING || sendMessageStatus.requestStatus === RequestStatus.PENDING) {
            return <Spinner></Spinner>
        }
        matchMessages.reverse();
        return matchMessages.map(msg => {

            return (
                <ChatBubble
                    key={msg.message}
                    isMine={selectedMatch._id.startsWith(msg.to)}
                    data={msg}
                />
            )
        })

    }

    render() {
        const { matchMessages, selectedMatch, matchMessagesStatus, sendMessageStatus } = this.props;
        console.log("MATCH MESSAGE STATUS", matchMessagesStatus)
        console.log("SENDMESSAGESTATUS", sendMessageStatus)

        return (
            <div className="message-list-container scrollable white">{this.renderMessages({ matchMessages, selectedMatch, matchMessagesStatus, sendMessageStatus })}</div>
        );
    }
}

ChatWindow.propTypes = {
    matchMessages: PropTypes.array.isRequired,
    selectedMatch: PropTypes.string.isRequired,
    matchMessagesStatus: PropTypes.string.isRequired,
    sendMessageStatus: PropTypes.object.isRequired,
}