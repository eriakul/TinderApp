import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../TinderApp.css'


export default class MatchDisplay extends Component {

    render() {
        const { selectedMatch } = this.props;

        if (!selectedMatch) {
            return (
                <div className="match-display-container">
                    NO MATCH SELECTED
                </div>)
        }

        return (
            <div className="match-display-container">
                <img className="photo" src={selectedMatch.photo} alt="" />
                <div className="match-info-container" >
                    <div className="name">{selectedMatch.name}</div>
                    <div className="bio" id="style-15">{selectedMatch.bio}</div>
                </div>
            </div>
        );
    }
}

MatchDisplay.propTypes = {
    selectedMatch: PropTypes.object,
    matchLines: PropTypes.object.isRequired,
    selectLine: PropTypes.func.isRequired,
    openAddLineModal: PropTypes.func.isRequired,

}