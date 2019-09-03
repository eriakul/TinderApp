import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import '../../TinderApp.css'

export default class AddLineModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLine: ""
        };
    }

    handleChange = event => {
        this.setState({
            newLine: event.target.value
        });
    }

    render() {
        const { addLineToDatabase, sendMessageToTinder, onReject, selectedMatch } = this.props;
        const { newLine } = this.state;


        return (
            <Modal show={true} onHide={onReject}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new pick up line for "{selectedMatch.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl as="textarea" aria-label="selectedLine" value={newLine}
                        onChange={this.handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { addLineToDatabase({ line: newLine }); onReject() }}>
                        Add Line
              </Button>
                    <Button id="send-btn" variant="primary" onClick={() => {
                        addLineToDatabase({ line: newLine })
                        sendMessageToTinder({ message: newLine })
                        onReject()
                    }}>
                        Add and Send Line
              </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

AddLineModal.propTypes = {
    onReject: PropTypes.func.isRequired,
    addLineToDatabase: PropTypes.func.isRequired,
    sendMessageToTinder: PropTypes.func.isRequired,
    selectedMatch: PropTypes.object,
}