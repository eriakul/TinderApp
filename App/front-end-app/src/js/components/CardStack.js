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

    clickedReaction({ name, line, type }) {

        let lT = JSON.parse(localStorage.getItem("likesTracker"));
        if (lT === null || typeof lT !== "object") {
            lT = { name: {} }
        }
        else {
            if (!lT[name]) {
                lT[name] = {}
            }
        }
        lT[name][line] = type
        localStorage.setItem("likesTracker", JSON.stringify(lT))
        this.setState({ selectedLine: line })
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

        let likesTracker = JSON.parse(localStorage.getItem("likesTracker"));
        if (likesTracker === null) {
            likesTracker = {}
        }
        else {
            if (!likesTracker[name]) {
                likesTracker = {}
            }
            else (likesTracker = likesTracker[name])
        }


        return (
            <div className="card-stack">
                {lines.value.lines.map((line) => {
                    let reactionStatus = likesTracker[line];
                    let buttonClass;
                    if (reactionStatus === "liked") {
                        buttonClass = "reaction-button liked"
                    }
                    else if (reactionStatus === "disliked") {
                        buttonClass = "reaction-button disliked"
                    }
                    else {
                        buttonClass = "reaction-button neutral"
                    }

                    return (
                        <Card >
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {line}
                                    </p>
                                    <div className="button-box">
                                        <span id="neutral">+3</span>
                                        <FontAwesomeIcon onClick={() => this.clickedReaction({ line, name, type: "liked" })} id="like" className={buttonClass} icon={faThumbsUp} size="lg" />
                                        <FontAwesomeIcon onClick={() => this.clickedReaction({ line, name, type: "disliked" })} id="dislike" className={buttonClass} icon={faThumbsDown} size="lg" />
                                        {/* <FontAwesomeIcon id="flag" className={buttonClass} icon={faFlag} size="lg" /> */}
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
    name: PropTypes.string,
    lines: PropTypes.object.isRequired,

}