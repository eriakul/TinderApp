import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';
import '../../TinderApp.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default class SearchBar extends Component {
    render() {
        const { onChange, selectedTerm } = this.props;
        return (
            <div className="search-bar-container">
                <FontAwesomeIcon style={{color:"gray"}} icon={faSearch} size="lg" />
                <Form.Control
                    className="search-bar"
                    value={selectedTerm}
                    onChange={onChange}
                />
            </div>
        )
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedTerm: PropTypes.string.isRequired,
}