import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardStack from '../components/CardStack'
import { connect } from 'react-redux';
import { getPULForName, addLineToDB } from '../../actions/Actions'
import AddLineModalGeneral from '../components/AddLineModalGeneral'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


class GeneralPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            submittedName: '',
            showAddLineModal: false,
        };
        this.addLineToDatabase = this.addLineToDatabase.bind(this);


    }

    componentWillMount() {
        let name = this.props.match.params.name;
        if (name) {
            this.setState({ submittedName: name, name })
            this.props.getPULForName(name);
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const name = this.state.name;
        this.setState({ submittedName: name })
        this.props.getPULForName(name);
        this.props.history.push(`/name/${name}`)
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    addLineToDatabase({ line }) {
        const name = this.state.submittedName;
        this.props.addLineToDB(name, line)
        this.props.getPULForName(name)

    }

    renderAddLineMessage({ submittedName }) {
        if (!submittedName) {
            return null
        }
        return (
            <div className="general-add-lines-message" onClick={() => { this.setState({ showAddLineModal: true }) }}>
                <FontAwesomeIcon style={{ color: "gray", marginRight:"12px" }} icon={faPlus} size="sm" /> 
                Click here to add a pick up line for {submittedName}.</div>
        )
    }

    renderAddLineModal({ showAddLineModal, submittedName }) {
        if (!showAddLineModal) {
            return null
        }
        return <AddLineModalGeneral
            name={submittedName}
            addLineToDatabase={this.addLineToDatabase}
            onReject={() => this.setState({ showAddLineModal: false })} />
    }


    render() {
        const { matchLines } = this.props;
        const { name, submittedName, showAddLineModal } = this.state;

        return (
            <div className="general-container">
                <Header isGeneral={true}></Header>
                <div className="general-page-container">
                    {this.renderAddLineModal({ showAddLineModal, submittedName })}
                    <div className="general-name-input">
                        <Form controlId="token" onSubmit={this.onSubmit}>
                            <Form.Group  >
                                <Form.Label>Enter a name below</Form.Label>
                                <Form.Control
                                    placeholder="jennifer"
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
                    </div>
                    {this.renderAddLineMessage({ submittedName })}
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
