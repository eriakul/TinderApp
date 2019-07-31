import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'





export default class MatchSelect extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null,
        };
    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header as="h5">Matches</Card.Header>
                <ListGroup variant="flush">
                    <Button variant="outline-secondary" size="lg" block>
                        Nathan
                    </Button>
                    <Button variant="outline-secondary" size="lg" block>
                        Nate
                    </Button>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary">prev</Button>
                        <Button variant="secondary">next</Button>
                    </ButtonGroup>
                </ListGroup>
            </Card>
        );
    }
}

MatchSelect.propTypes = {
    matches: PropTypes.array.isRequired,
}
