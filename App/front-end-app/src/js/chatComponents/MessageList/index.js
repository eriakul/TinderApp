import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
// import moment from 'moment';
import PropTypes from 'prop-types';
import './MessageList.css';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  getMessages = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        messages: [
          {
            id: 1,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 2,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 3,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 4,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 5,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 6,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 7,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 8,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 9,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 10,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
        ]
      };
    });
  }

  renderMessages({ matchMessages }) {
    // let i = 0;
    // let messageCount = this.state.messages.length;
    // let messages = [];

    // while (i < messageCount) {
    //   let previous = this.state.messages[i - 1];
    //   let current = this.state.messages[i];
    //   let next = this.state.messages[i + 1];
    //   let isMine = current.author === MY_USER_ID;
    //   let currentMoment = 1000;
    //   let prevBySameAuthor = false;
    //   let nextBySameAuthor = false;
    //   let startsSequence = true;
    //   let endsSequence = true;
    //   let showTimestamp = true;

    //   if (previous) {
    //     let previousMoment = 10000;
    //     let previousDuration = 1000;
    //     prevBySameAuthor = previous.author === current.author;

    //     if (prevBySameAuthor && previousDuration.as('hours') < 1) {
    //       startsSequence = false;
    //     }

    //     if (previousDuration.as('hours') < 1) {
    //       showTimestamp = false;
    //     }
    //   }

    //   if (next) {
    //     let nextMoment = 345678;
    //     let nextDuration = 100;
    //     nextBySameAuthor = next.author === current.author;

    //     if (nextBySameAuthor && nextDuration.as('hours') < 1) {
    //       endsSequence = false;
    //     }
    //   }

    //   messages.push(
    //     <Message
    //       key={i}
    //       isMine={isMine}
    //       startsSequence={startsSequence}
    //       endsSequence={endsSequence}
    //       showTimestamp={showTimestamp}
    //       data={current}
    //     />
    //   );

    //   // Proceed to the next message.
    //   i += 1;
    // }
    const messages = [
      <Message
        key={1}
        isMine={true}
        startsSequence={true}
        endsSequence={true}
        showTimestamp={false}
        data={{ message: "hjk" }}
      />
    ]
    return messages;
  }

  render() {
    const { selectedMatch, matchMessages, selectLine } = this.props;
    if (!selectedMatch) {
      return <div></div>
    }


    return (
      <div className="message-list">
        <Toolbar
          title={selectedMatch["name"]}
        />

        <div className="message-list-container">{this.renderMessages({ matchMessages })}</div>

        <Compose />
        ]} />
      </div>
    );
  }
}

MessageList.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  matchMessages: PropTypes.object.isRequired,
  selectLine: PropTypes.func.isRequired,
}