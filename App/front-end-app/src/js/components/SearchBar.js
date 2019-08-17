import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';


export default class SearchBar extends Component {

    render() {
        const { onChange, selectedTerm } = this.props;

        return (
            <div className="search-bar">
                <Form.Control
                    value={selectedTerm}
                    onChange={onChange}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedTerm: PropTypes.string.isRequired,
}