import React, { Component } from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import getAuthToken from '../../api/fetchAuthToken'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getPULForName } from '../../actions/Actions'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            token: null,
        };
    }


    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.props.getPULForName("jennifer")
    }


    render() {
        const { handleLogin, matchLines } = this.props;
        const { token } = this.state;
        if (token) {
            console.log(token)
        }
        console.log(matchLines)
        return (
            <div className="Login">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="email" bsSize="large">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bsSize="large">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        block
                        variant="dark"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
          </Button>
                </Form>
            </div >
        );
    }
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    matchLines: PropTypes.array.isRequired
}


export default connect(
    ({ matchLines }) => ({
        matchLines
    }),
    {
        getPULForName
    }
)(Login);