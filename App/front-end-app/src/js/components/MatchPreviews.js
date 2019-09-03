import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar'

export default class MatchPreviews extends Component {
    constructor(props) {
        super();
        this.state = {
            searchTerm: "",
        };
    }

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    }

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
        const { matchData, selectMatch, refreshSendMessage } = this.props;
        const { searchTerm } = this.state;
        return (
            <div className="side-panel-container">
                <SearchBar searchTerm={searchTerm} onChange={this.handleChange} ></SearchBar>

                <div className="preview-container" id="style-15">
                    {this.filterMatches({ matchData, searchTerm }).map(match => {
                        return (
                            <div className="preview-photo-wrapper" onClick={() => {
                                selectMatch(match); refreshSendMessage()
                            }}>
                                <img className="preview-photo" src={match.photo} alt="" />
                                <div className="match-preview-name">{this.sliceName(match.name)}</div>
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

MatchPreviews.propTypes = {
    matchData: PropTypes.object.isRequired,
    selectMatch: PropTypes.func.isRequired,
    refreshSendMessage: PropTypes.func.isRequired,
}