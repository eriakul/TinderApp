import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'



export default class LineSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSendLineButton: false,
            selectedLine: ""
        };
    }

    renderSendLineButton({ showSendLineButton, sendMessage, selectedLine }) {
        if (!showSendLineButton) {
            return null;
        }
        return (
            <div className="send-line-button-container">
                <Button id="send-btn" variant="primary" size="lg" block onClick={() => sendMessage({ message: selectedLine })}>
                    Send this Line!
                </Button >
            </div>
        )
    }

    render() {
        const { sendMessage, matchLines, selectedMatch } = this.props;
        const { showSendLineButton, selectedLine } = this.state;
        if (!matchLines || !selectedMatch) {
            return null
        }

        if (matchLines.length === 0 && !!selectedMatch) {
            return (
                <Alert variant="info">
                    There are no lines for this name yet. Add one below!
            </Alert>)
        }
        return (
            <div className="add-line-container">
                <div className="line-list-container" id="style-15">
                    <ListGroup>
                        {matchLines.map(lineObject => {
                            let line = lineObject["line"]
                            return <ListGroup.Item action={true} eventKey={line} onClick={() => this.setState({ selectedLine: line, showSendLineButton: true })}>{line}</ListGroup.Item>
                        }
                        )}

                    </ListGroup>
                </div>
                {this.renderSendLineButton({ showSendLineButton, sendMessage, selectedLine })}
            </div>
        );
    }
}

LineSelect.propTypes = {
    matchLines: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    selectedMatch: PropTypes.object.isRequired
}