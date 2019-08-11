import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import RequestStatus from '../../static/RequestStatus'
import PropTypes from 'prop-types';
import ChatBubble from './ChatBubble'
import NoSelectedMatch from './imgs/noMatchSelected.jpg'
import '../../TinderApp.css';


export default class MatchPreviewPanel extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     conversations: []
    //   };
    // }
    renderMessages({ matchMessages, selectedMatch }) {
        if (!selectedMatch) {
            return <img className="nomatchimg" src={NoSelectedMatch} alt="" />
        }
        if (!matchMessages.RequestStatus === RequestStatus.PENDING) {
            return <Spinner></Spinner>
        }
        if (!matchMessages.RequestStatus === RequestStatus.SUCCEEDED) {
            return null
        }
        return matchMessages.value.reverse().map(msg => {
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
        const { matchMessages, selectedMatch } = this.props;


        return (
            <div className="message-list-container scrollable white">{this.renderMessages({ matchMessages, selectedMatch })}</div>
        );
    }
}

MatchPreviewPanel.propTypes = {
    matchMessages: PropTypes.array.isRequired,
    selectedMatch: PropTypes.string.isRequired,
}