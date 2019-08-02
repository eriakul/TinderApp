import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import RequestStatus from '../../../../src/static/RequestStatus'
import PulList from '../PulList'

import './AddLinesPanel.css'

export default class AddLinesPanel extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     conversations: []
  //   };
  // }
  renderMatchLines({ matchLines, selectLine }) {
    if (matchLines.requestStatus === RequestStatus.PENDING) {
      return <div><Spinner animation="border" role="status"></Spinner></div>
    }
    return <PulList selectLine={selectLine} matchLines={matchLines.value.lines}></PulList>

  }

  render() {
    const { selectedMatch, matchLines, selectLine } = this.props;

    if (!selectedMatch) {
      return null
    }

    return (
      <div>
        <div >
          <img className="propic" src={selectedMatch.photo} alt=""></img>
        </div>
        <div className="bio">{selectedMatch.bio}</div>
        <div className="scrollable">
          {this.renderMatchLines({ matchLines, selectLine })}
        </div>
      </div>
    );
  }
}

AddLinesPanel.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  matchLines: PropTypes.object.isRequired,
  selectLine: PropTypes.func.isRequired,
}