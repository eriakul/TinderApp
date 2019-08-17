import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineSelect from './LineSelect'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import '../../TinderApp.css'
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup'

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
                <div className="match-info" >
                    <div className="name">{selectedMatch.name}</div>
                    <div className="bio">{selectedMatch.bio}</div>
                </div>
            </div>
        );
    }
}

MatchDisplay.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    selectLine: PropTypes.func.isRequired,
    openAddLineModal: PropTypes.func.isRequired,

}