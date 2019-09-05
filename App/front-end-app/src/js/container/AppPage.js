import React from 'react';
import PropTypes from 'prop-types';
import RequestStatus from '../../static/RequestStatus';
import AddLineModal from '../components/AddLineModal'
import SelectLineSection from '../components/SelectLineSection'
import AddLinesSection from '../components/AddLinesSection'
import MatchPreviews from '../components/MatchPreviews'
import { getMatchData, getPULForName, addLineToDB, sendMessage, refreshSendMessage } from '../../actions/Actions'
import { connect } from 'react-redux';
import MatchDisplay from '../components/MatchDisplay'
import MessageSendingBar from '../components/MessageSendingBar'


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
        this.props.getPULForName(selectedMatch.name);
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

    }

    renderAddLineModal({ showAddLineModal, selectedMatch }) {
        if (!showAddLineModal) {
            return null
        }
        return <AddLineModal
        selectedMatch={selectedMatch}
            addLineToDatabase={this.addLineToDatabase}
            sendMessageToTinder={this.sendMessageToTinder}
            onReject={() => this.setState({ showAddLineModal: false })}></AddLineModal>

    }


    render() {
        const { matchData, matchLines } = this.props;
        const { selectedMatch, showAddLineModal } = this.state;
        if (matchData.requestStatus === RequestStatus.UNINITIALIZED || matchData.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return (
            <div className="app-container">
                {this.renderAddLineModal({ showAddLineModal, selectedMatch })}
                <MatchPreviews matchData={matchData} selectMatch={this.selectMatch} refreshSendMessage={this.props.refreshSendMessage} />

                <div className="page-container">
                    <div className="header"><span style={{color:"#ff5864"}}>Pun</span>InAMillion</div>
                    <div className="column-container">
                        <MatchDisplay
                            selectedMatch={selectedMatch}
                            matchLines={matchLines}
                            selectLine={this.selectLine}
                            openAddLineModal={this.openAddLineModal}>
                        </MatchDisplay>
                        <MessageSendingBar selectedMatch={selectedMatch}></MessageSendingBar>
                        <SelectLineSection
                            selectedMatch={selectedMatch}
                            matchLines={matchLines}
                            sendMessage={this.sendMessageToTinder}
                        />
                        <AddLinesSection
                            selectedMatch={selectedMatch}
                            matchLines={matchLines}
                            selectLine={this.selectLine}
                            openAddLineModal={() => { this.setState({ showAddLineModal: true }) }}>
                        </AddLinesSection>
                    </div>
                </div>
            </div>
        );
    }
}


AppPage.propTypes = {
    matchData: PropTypes.object.isRequired,
    getMatchData: PropTypes.func.isRequired,
    getPULForName: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    matchLines: PropTypes.object.isRequired,
    refreshSendMessage: PropTypes.func.isRequired,
    addLineToDB: PropTypes.func.isRequired,

}

export default connect(
    ({ matchData, matchLines, addLineStatus,
        sendMessageStatus }) => ({
            matchData,
            matchLines,
            addLineStatus,
            sendMessageStatus,
        }),
    {
        sendMessage,
        addLineToDB,
        getMatchData,
        getPULForName,
        refreshSendMessage
    }
)(AppPage);

