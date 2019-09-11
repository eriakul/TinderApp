import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import RequestStatus from "../../static/RequestStatus";
import Header from './Header'


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

        return (
            <div className="general-container">
                <Header isGeneral={false}></Header>
                <div className="general-page-container">
                    <div className="general-name-input">
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
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    tinderToken: PropTypes.object.isRequired,
    smsMessage: PropTypes.object.isRequired
}

