import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faFlag } from "@fortawesome/free-solid-svg-icons";
import RequestStatus from '../../static/RequestStatus';
import Spinner from 'react-bootstrap/Spinner'
import { changeLineScore } from '../../api/ApiFunctions'



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

        if (!lT[name][line]) {
            if (type === "liked") {
                changeLineScore({ name, punText: line, score_delta: 1 })
            }
            if (type === "disliked") {
                changeLineScore({ name, punText: line, score_delta: -1 })
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

        if (lines.value.lines.length === 0) {
            return <div className="no-lines">There are no lines for this name yet!</div>
        }


        return (
            <div className="card-stack">
                {lines.value.lines.map((lineObject) => {

                    let line = lineObject["line"];
                    let score = lineObject["score"];
                    let reactionStatus = likesTracker[line];
                    let buttonClass;
                    let scoreModifier;
                    if (reactionStatus === "liked") {
                        buttonClass = "reaction-button liked";
                        scoreModifier = 1;
                    }
                    else if (reactionStatus === "disliked") {
                        buttonClass = "reaction-button disliked";
                        scoreModifier = -1;

                    }
                    else {
                        buttonClass = "reaction-button neutral";
                        scoreModifier = 0;
                    }

                    score = parseInt(score) + scoreModifier - 10;

                    let prefix = score > 0 ? "+" : "";
                    let id;
                    if (score > 0) {
                        id = "good"
                    }
                    else if (score < 0) {
                        id = "bad"
                    }
                    else {
                        id = "neutral"
                    }

                    return (
                        <Card >
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {line}
                                    </p>
                                    <div className="button-box">
                                        <span id={id}>{prefix}{score}</span>
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