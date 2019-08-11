import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineSelect from './LineSelect'
import Button from 'react-bootstrap/Button'


import '../../TinderApp.css'
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner';
import AddLines from './AddLines'

export default class AddLinesPanel extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     conversations: []
    //   };
    // }
    renderLoading({ matchLines }) {
        if (matchLines.requestStatus === RequestStatus.PENDING) {
            return <div style={{ textAlign: "center", color: "#FFF" }}><Spinner animation="border" variant="light"></Spinner>  *vrrr* Generating lines...</div>
        }
        return null
    }

    renderNoMatchLines({ matchLines }) {
        if (matchLines.length === 0) {
            return (
                <div className="centered">There are no lines for this name yet!</div>
            )
        }
    }

    renderMatchLines({ matchLines, selectLine }) {
        if (matchLines.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return <LineSelect selectLine={selectLine} matchLines={matchLines.value.lines}></LineSelect>

    }

    render() {
        const { selectedMatch, matchLines, selectLine, addLine, openAddLineModal } = this.props;

        if (!selectedMatch) {
            return (
                <div className="round-container">

                </div>)
        }

        return (
            <div className="round-container">
                <div >
                    <img className="propic" src={selectedMatch.photo} alt=""></img>
                </div>
                <div className="name">{selectedMatch.name}</div>
                <div className="bio">{selectedMatch.bio}</div>
                {this.renderLoading({ matchLines })}
                {this.renderNoMatchLines({ matchLines })}
                <div className="line-list-container">
                    {this.renderMatchLines({ matchLines, selectLine })}
                </div>
                <div>{`Don't see a good line for ${selectedMatch.name}?`}</div>
                <Button variant="secondary" size="lg" block onClick={() => openAddLineModal}>
                    Add Your Own Line
                </Button>

            </div>
        );
    }
}

AddLinesPanel.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    selectLine: PropTypes.func.isRequired,
    addLine: PropTypes.func.isRequired,
    openAddLineModal: PropTypes.func.isRequired,

}