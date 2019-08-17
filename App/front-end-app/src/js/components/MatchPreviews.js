import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class MatchPreviews extends Component {

    filterMatches({ matchData, searchTerm }) {
        const pattern = new RegExp(searchTerm, 'i')
        return matchData.value.filter(match => {
            return pattern.test(match.name)
        })
    }

    sliceName(name) {
        if (name.length > 10) {
            return name.slice(0, 5) + "..."
        }
        return name
    }

    render() {
        const { matchData, selectMatch, searchTerm } = this.props;
        console.log(searchTerm)
        return (
            this.filterMatches({ matchData, searchTerm }).map(match => {
                return (
                    <div className="preview-photo-wrapper" onClick={() => selectMatch(match)}>
                        <img className="preview-photo" src={match.photo} alt="" />
                        {this.sliceName(match.name)}
                    </div>)
            })
        );
    }
}

MatchPreviews.propTypes = {
    matchData: PropTypes.object.isRequired,
    selectMatch: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
}