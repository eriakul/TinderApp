import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import RequestStatus from "../../static/RequestStatus";
import Header from './Header'


export default class EnterPhoneNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: "",
        };
    }

    handleChange = event => {
        this.setState({
            number: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const number = this.state.number;
        this.props.handleSendSms("1" + number);
    }

    renderSendButton({ smsMessage }) {
        if (smsMessage.requestStatus === RequestStatus.PENDING) {
            return (
                <Button
                    disabled
                    block
                    variant="dark"
                    type="submit"
                >
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> Sending
                </Button>)
        }
        return (
            <Button
                block
                variant="dark"
                type="submit"
            >
                Send Authentication Text
            </Button>
        )
    }

    render() {
        const { smsMessage } = this.props;
        const { number } = this.state;

        return (


            <div className="general-container">
                <Header isGeneral={false}></Header>
                <div className="general-page-container">
                    <div className="general-name-input">
                        <Form controlId="SMS" onSubmit={this.onSubmit}>
                            <Form.Group controlId="number" >
                                <Form.Label>Enter your phone number</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">1+</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        autoFocus
                                        type="string"
                                        value={number}
                                        onChange={this.handleChange}
                                    /></InputGroup>
                            </Form.Group>
                            {this.renderSendButton({ smsMessage })}
                        </Form>
                    </div>
                </div>
            </div >


        );
    }
}

EnterPhoneNumber.propTypes = {
    handleSendSms: PropTypes.func.isRequired,
    smsMessage: PropTypes.object.isRequired,
}