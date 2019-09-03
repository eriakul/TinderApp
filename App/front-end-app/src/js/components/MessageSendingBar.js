import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequestStatus from '../../static/RequestStatus'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'




class MessageSendingBar extends Component {

    render() {
        const { sendMessageStatus, selectedMatch } = this.props;

        if (sendMessageStatus.requestStatus !== RequestStatus.SUCCEEDED && sendMessageStatus.requestStatus !== RequestStatus.PENDING) {
            return null;
        }

        if (!selectedMatch) {
            return null
        }

        if (sendMessageStatus.requestStatus === RequestStatus.SUCCEEDED) {
            return (
                <Alert variant="success">
                    <b>Message sent:</b> {sendMessageStatus.message}
                </Alert>
            )
        }
        else {
            return (
                <Alert variant="warning">
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Sending message to {selectedMatch.name}...
                </Alert>)
        }
    }
}

MessageSendingBar.propTypes = {
    sendMessageStatus: PropTypes.object.isRequired,
    selectedMatch: PropTypes.object.isRequired,
}

export default connect(
    ({
        sendMessageStatus }) => ({
            sendMessageStatus,
        })
)(MessageSendingBar);