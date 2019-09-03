import React, { Component } from 'react';
// import moment from 'moment';

export default class Message extends Component {
  render() {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = this.props;

    // const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              {/* { friendlyTimestamp } */} 00001
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={1234567}>
            { data.message }
          </div>
        </div>
      </div>
    );
  }
}