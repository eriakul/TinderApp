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
        const { addLineToDatabase, onReject, name } = this.props;
        const { newLine } = this.state;


        return (
            <Modal show={true} onHide={onReject}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new pick up line for "{name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl as="textarea" aria-label="selectedLine" value={newLine}
                        onChange={this.handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { addLineToDatabase({ line: newLine }); onReject() }}>
                        Add Line
                    </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

AddLineModal.propTypes = {
    onReject: PropTypes.func.isRequired,
    addLineToDatabase: PropTypes.func.isRequired,
    name: PropTypes.string,
}