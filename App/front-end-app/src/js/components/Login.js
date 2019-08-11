import React, { Component } from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Logo from '../components/Logo'
import { Grid, Row, Col } from 'react-flexbox-grid'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import RequestStatus from "../../static/RequestStatus";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
        };
    }


    validateForm() {
        return this.state.code.length !== 0;
    }

    handleChange = event => {
        this.setState({
            code: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const code = this.state.code;
        const req_code = this.props.smsMessage.value;
        this.props.handleLogin(code, req_code);
    }

    renderLoginButton(isPending) {
        if (!isPending) {
            return (
                <div>
                    Login
                </div>
            )
        }
        else {
            return (
                <div>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Logging in...
                </div>
            )
        }
    }


    render() {
        const { tinderToken } = this.props;
        const { code } = this.state;

        const isPending = tinderToken.requestStatus === RequestStatus.PENDING;

        return (<Grid fluid>
            <Col>
                <Row center="xs" middle="xs" around="xs" >
                    <Col className='row center-md center-xs' xs={6} md={4} lg={4}>
                        <Row><Logo /></Row>
                        <Row>
                            <div >
                                <Form controlId="token" onSubmit={this.onSubmit}>
                                    <Form.Group controlId="code" >
                                        <Form.Label>Authentication Code</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            value={code}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Button
                                        block
                                        variant="dark"
                                        disabled={!this.validateForm()}
                                        type="submit"
                                    >
                                        {this.renderLoginButton(isPending)}
                                    </Button>
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

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    tinderToken: PropTypes.object.isRequired,
    smsMessage: PropTypes.object.isRequired
}

