import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types';



import './PulList.css';

export default class PulList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     messages: []
  //   };
  // }

  render() {
    const { selectLine, matchLines } = this.props;
    return (
      <ListGroup>
        {matchLines.map(line => {
          return <ListGroup.Item action={true} eventKey={line} onClick={() => selectLine(line)}>{line}</ListGroup.Item>
        }
        )}

      </ListGroup>
    );
  }
}

PulList.propTypes = {
  matchLines: PropTypes.array.isRequired,
  selectLine: PropTypes.func.isRequired,
}