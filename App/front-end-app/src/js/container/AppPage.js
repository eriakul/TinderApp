import React from 'react';
import PropTypes from 'prop-types';

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import MatchSelect from '../components/MatchSelect'
// import Chat from '../components/Chat'
import AppContainer from '../components/AppContainer'
import RequestStatus from '../../static/RequestStatus';
import AddLineModal from '../components/AddLineModal'

import matchData from '../../reducers/matchData'
import matchLines from '../../reducers/matchLines'
import matchMessages from '../../reducers/matchMessages'

import { getMatchData, getMatchMessages, getPULForName, addLineToDB, sendMessage } from '../../actions/Actions'
import { connect } from 'react-redux';


class AppPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null,
            selectedLine: null,
            showAddLineModal: false,
        };
        this.selectMatch = this.selectMatch.bind(this);
        this.selectLine = this.selectLine.bind(this);
        this.addLineToDatabase = this.addLineToDatabase.bind(this);
        this.sendMessageToTinder = this.sendMessageToTinder.bind(this);

    }

    componentDidMount() {
        const token = this.props.token;
        this.props.getMatchData(token)
    }

    selectMatch(selectedMatch) {
        this.setState({ selectedMatch })
        const token = this.props.token;
        this.props.getPULForName(selectedMatch.name);
        this.props.getMatchMessages(token, selectedMatch._id);
    }

    selectLine(lineText) {
        this.setState({ selectedLine: lineText })
    }

    addLineToDatabase({ line }) {
        const name = this.state.selectedMatch.name;
        this.props.addLineToDB(name, line)

    }

    sendMessageToTinder({ message }) {
        const token = this.props.token;
        const match_id = this.state.selectedMatch._id;
        this.props.sendMessage(token, match_id, message);
        const match = this.state.selectedMatch;
        match["empty"] = !match["empty"]
        this.setState({ selectedMatch: match })

    }

    renderAddLineModal({ showAddLineModal }) {
        if (!showAddLineModal) {
            return null
        }
        return <AddLineModal
            addLineToDatabase={this.addLineToDatabase}
            sendMessageToTinder={this.sendMessageToTinder}
            onReject={() => this.setState({ showAddLineModal: false })}></AddLineModal>

    }


    render() {
        const { matchData, matchMessages, matchLines, addLineStatus, sendMessageStatus } = this.props;
        const { selectedMatch, selectedLine, showAddLineModal } = this.state;
        if (matchData.requestStatus === RequestStatus.UNINITIALIZED || matchData.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return (
            <div>
                {this.renderAddLineModal({ showAddLineModal })}
                <AppContainer

                    selectMatch={this.selectMatch}
                    matchData={matchData.value}
                    matchMessages={matchMessages}
                    selectedMatch={selectedMatch}
                    matchLines={matchLines}
                    selectLine={this.selectLine}
                    selectedLine={selectedLine}
                    openAddLineModal={() => this.setState({ showAddLineModal: true })}
                    sendMessageToTinder={this.sendMessageToTinder}
                    sendMessageStatus={sendMessageStatus}
                >
                </AppContainer>
            </div>
        );
    }
}


AppPage.propTypes = {
    matchData: PropTypes.object.isRequired,
    getMatchData: PropTypes.func.isRequired,
    getPULForName: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    matchMessages: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    getMatchMessages: PropTypes.func.isRequired,

}

export default connect(
    ({ matchData, matchMessages, matchLines, addLineStatus,
        sendMessageStatus }) => ({
            matchData,
            matchMessages,
            matchLines,
            addLineStatus,
            sendMessageStatus,
        }),
    {
        sendMessage,
        addLineToDB,
        getMatchData,
        getMatchMessages,
        getPULForName
    }
)(AppPage);

