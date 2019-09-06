import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardStack from '../components/CardStack'
import { connect } from 'react-redux';
import { getPULForName, addLineToDB } from '../../actions/Actions'

import RequestStatus from '../../static/RequestStatus';

class GeneralPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            submittedName: '',
        };

    }

    onSubmit = (event) => {
        event.preventDefault();
        const name = this.state.name;
        this.setState({ submittedName: name })
        this.props.getPULForName(name);
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        const { matchLines } = this.props;
        const { name, submittedName} = this.state;

        return (
            <div className="general-container">
                <Header></Header>
                <div className="general-page-container">
                    <div className="general-name-input">
                        <Form controlId="token" onSubmit={this.onSubmit}>
                            <Form.Group controlId="code" >
                                <Form.Label>Enter a name below</Form.Label>
                                <Form.Control
                                    placeholder="jennifer"
                                    style={{ width: "600px" }}
                                    size="lg"
                                    type="text"
                                    autoFocus
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Button
                                block
                                variant="dark"
                                type="submit"
                            >
                                Get Pick Up Lines For This Name
                        </Button>
                        </Form>
                        <a href="tinder" style={{ marginTop: "12px", color: "gray" }}>Connect to Tinder and send lines automatically.</a>

                    </div>

                    <CardStack name={submittedName} lines={matchLines}></CardStack>
                </div >
            </div>

        );
    }
}
GeneralPage.propTypes = {
    getPULForName: PropTypes.func.isRequired,
    matchLines: PropTypes.object.isRequired,
    addLineToDB: PropTypes.func.isRequired,
}

export default connect(
    ({ matchLines, addLineStatus, }) => ({
        matchLines,
        addLineStatus,
    }),
    {
        addLineToDB,
        getPULForName,

    }
)(GeneralPage);
