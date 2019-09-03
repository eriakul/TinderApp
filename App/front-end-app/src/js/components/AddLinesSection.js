import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import '../../TinderApp.css'

export default class AddLinesSection extends Component {

    render() {
        const { selectedMatch, openAddLineModal } = this.props;

        if (!selectedMatch) {
            return (
                <div className="add-line-container">
                </div>)
        }

        return (
            <div className="add-line-container">

                <div>{`Don't see a good line for ${selectedMatch.name}?`}</div>
                <div style={{ marginBottom: "30px" }}>
                    <Button id="add-line-btn" variant="secondary" size="lg" block onClick={openAddLineModal}>
                        Add Your Own Line
                </Button>
                </div>
            </div>
        );
    }
}

AddLinesSection.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
}