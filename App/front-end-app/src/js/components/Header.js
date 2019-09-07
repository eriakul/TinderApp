import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';



export default class Header extends React.Component {

    renderLink({ isGeneral }) {
        if (!isGeneral) {
            return (
                <Link className="float-right" to="/">HOME</Link>
            )
        }
        return (
            <Link className="float-right" to="/tinder">BETA</Link>
        )
    }

    render() {
        const { isGeneral } = this.props;
        return (
            <div className="header"><span style={{ color: "#ff5864" }}>Pun</span>InAMillion
         {this.renderLink({ isGeneral })}</div>
        )
    }
}

Header.propTypes = {
    isGeneral: PropTypes.bool.isRequired,
}