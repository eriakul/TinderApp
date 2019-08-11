import React, { Component } from 'react';
// import moment from 'moment';
import './Message.css';
import PropTypes from 'prop-types';

export default class ChatBubble extends Component {
    render() {
        const {
            data,
            isMine,
        } = this.props;

        return (
            <div className={[
                'message',
                `${isMine ? 'mine' : ''}`
            ].join(' ')}>

                <div className="bubble-container">
                    <div className="bubble" title={1234567}>
                        {data.message}
                    </div>
                </div>
            </div>
        );
    }
}
ChatBubble.propTypes = {
    key: PropTypes.number,
    isMine: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
}