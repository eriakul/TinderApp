import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../static/images/love.svg'

const style = {
    height: "100%",
    lineHeight: "50px",
    fontSize: "30px",
    color: "white",
    letterSpacing: "2px",
    verticalALign: "middle"
};
export default class Header extends React.Component {

    // renderLink({ isGeneral }) {
    //     if (!isGeneral) {
    //         return (
    //             <Link className="float-right" to="/">HOME</Link>
    //         )
    //     }
    //     return (
    //         <Link className="float-right" to="/tinder">BETA</Link>
    //     )
    // }


    render() {
        // const { isGeneral } = this.props;
        return (
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{ alignItems: "center" }}>
                    <img
                        style={{ verticalAlign: "middle", marginLeft: "12px", marginRight: "12px", height: "50px" }}
                        alt=""
                        src={logo}
                        width="40"
                        height="40"
                    />
                    <span style={style}>
                        <span style={{ color: "#FF5864" }}>Pun</span>InaMillion
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Link className="link" to="/">HOME</Link>
                        <Link className="link" to="/tinder">BETA</Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    isGeneral: PropTypes.bool.isRequired,
}