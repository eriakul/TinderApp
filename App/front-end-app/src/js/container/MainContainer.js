import React from 'react';
import Login from '../components/Login'
import Logo from '../components/Logo'
import { Grid, Row, Col } from 'react-flexbox-grid';



export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { token: null };
    }

    handleLogin = (token) => {
        // this.setState({ token });
        console.log(token)
    }

    render() {
        const { token } = this.state;
        console.log(token);
        return (
            <Grid fluid>
                <Col>
                    <Row center="xs" middle="xs" around="xs" >
                        <Col className='row center-md center-xs' xs={6} md={4} lg={4}>
                            <Row><Logo /></Row>
                            <Row>
                                <Login handleLogin={this.handleLogin} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Grid >
        );

    }
}


