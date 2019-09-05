import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faFlag } from "@fortawesome/free-solid-svg-icons";
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner'



export default class CardStack extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedLine: '',
        };

    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        // const { matchData, matchLines } = this.props;
        const { name, lines } = this.props;

        if (lines.requestStatus === RequestStatus.PENDING) {
            return (
                <span>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> Loading...
                </span>)
        }

        if (lines.requestStatus !== RequestStatus.SUCCEEDED) {
            return null;
        }
        console.log(lines)


        return (
            <div className="card-stack">
                {lines.value.lines.map((line) => {
                    return (
                        <Card >
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {line}
                                    </p>
                                    <div className="button-box">
                                        <span id="neutral">+3</span>
                                        <FontAwesomeIcon className="reaction-button" icon={faThumbsUp} size="lg" />
                                        <FontAwesomeIcon className="reaction-button" icon={faThumbsDown} size="lg" />
                                        <FontAwesomeIcon id="flag" className="reaction-button" icon={faFlag} size="lg" />
                                    </div>
                                </blockquote>
                            </Card.Body>
                        </Card>)
                })}

            </div>
        );
    }
}

CardStack.propTypes = {
    name: PropTypes.object.isRequired,
    lines: PropTypes.object.isRequired,

}