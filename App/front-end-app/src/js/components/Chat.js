import React from 'react';
import PropTypes from 'prop-types';
import Messenger from '../chatComponents/Messenger'



export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null,
        };
    }

    render() {
        return (
            <Messenger></Messenger>
        );
    }
}

Chat.propTypes = {
    matchDatas: PropTypes.array.isRequired,
}
