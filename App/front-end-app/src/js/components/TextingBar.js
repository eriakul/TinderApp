import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';

import '../../TinderApp.css'
import Form from 'react-bootstrap/FormControl';


export default class TextingBar extends Component {
    render() {
        const { selectedLine, sendMessageToTinder } = this.props;
        return (
            <div className="text-bar-container">
                <InputGroup>
                    <FormControl disabled={true} placeholder={selectedLine} as="textarea" aria-label="selectedLine" />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => sendMessageToTinder({ message: selectedLine })}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}
TextingBar.propTypes = {
    selectedLine: PropTypes.func.isRequired,
    sendMessageToTinder: PropTypes.func.isRequired,

}