import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineSelect from './LineSelect'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'





import '../../TinderApp.css'
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner';

export default class AddLines extends Component {
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
        const { addLine } = this.props;
        const { newLine } = this.state;

        return (
            <InputGroup>
                <FormControl placeholder="{selectedLine}" as="textarea" aria-label="selectedLine" />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Send</Button>
                    <Button variant="outline-secondary">Send</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

AddLines.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    selectLine: PropTypes.func.isRequired,
    addLine: PropTypes.func.isRequired,

}