import React, { Component } from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Logo from '../components/Logo'
import { Grid, Row, Col } from 'react-flexbox-grid'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import RequestStatus from "../../static/RequestStatus";


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
            <Grid fluid>
                <Col>
                    <Row center="xs" middle="xs" around="xs" >
                        <Col className='row center-md center-xs' xs={6} md={4} lg={4}>
                            <Row><Logo /></Row>
                            <Row>
                                <div className="Login">
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
                                </div >
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Grid >

        );
    }
}

EnterPhoneNumber.propTypes = {
    handleSendSms: PropTypes.func.isRequired,
    smsMessage: PropTypes.object.isRequired,
}