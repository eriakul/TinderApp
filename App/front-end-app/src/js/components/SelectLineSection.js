import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineSelect from './LineSelect'
import Button from 'react-bootstrap/Button'


import '../../TinderApp.css'
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner';

export default class SelectLineSection extends Component {

    renderMatchLines({ matchLines, sendMessage }) {
        if (matchLines.requestStatus === RequestStatus.PENDING) {
            return <div className="add-line-container"><span style={{textAlign:"center", color:"gray"}}><Spinner
                animation="grow" variant="dark"></Spinner>  *vrrr* Generating lines...</span></div>
        }

        return <LineSelect sendMessage={sendMessage} matchLines={matchLines.value.lines}></LineSelect>

    }

    render() {
        const { sendMessage, matchLines } = this.props;

        return (
                this.renderMatchLines({ sendMessage, matchLines })
              );
    }
}

SelectLineSection.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    openAddLineModal: PropTypes.func.isRequired,

}