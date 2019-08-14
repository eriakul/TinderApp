import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types';
import RequestStatus from '../../static/RequestStatus'

export default class PulList extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     messages: []
    //   };
    // }

    render() {
        const { selectLine, matchLines } = this.props;
        if (!matchLines) {
            return null
        }

        if (matchLines.length === 0) {
            return null
        }
        return (
            <div className="line-list-container">
            <ListGroup>
                {matchLines.map(line => {
                    return <ListGroup.Item action={true} eventKey={line} onClick={() => selectLine(line)}>{line}</ListGroup.Item>
                }
                )}

            </ListGroup>
                            </div>
        );
    }
}

PulList.propTypes = {
    matchLines: PropTypes.array.isRequired,
    selectLine: PropTypes.func.isRequired,
}