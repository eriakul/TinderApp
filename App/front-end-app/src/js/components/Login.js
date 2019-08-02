import React, { Component } from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Logo from '../components/Logo'
import { Grid, Row, Col } from 'react-flexbox-grid'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'

export default class Login extends Component {
    constructor(props) {
        super(props);

        const passywordy = localStorage.getItem("passywordy")

        this.state = {
            email: "",
            password: passywordy,
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
        this.props.handleLogin(email, password);
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
        const { isPending } = this.props;
        const { email, password } = this.state;

        return (<Grid fluid>
            <Col>
                <Row center="xs" middle="xs" around="xs" >
                    <Col className='row center-md center-xs' xs={6} md={4} lg={4}>
                        <Row><Logo /></Row>
                        <Row>
                            <div className="Login">
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group controlId="email" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            value={password}
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
    isPending: PropTypes.bool.isRequired,
}


// export default connect(
//     () => ({

//     }),
//     {
//         getPULForName
//     }
// )(Login);