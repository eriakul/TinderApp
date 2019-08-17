import React from 'react';
import PropTypes from 'prop-types';

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import MatchSelect from '../components/MatchSelect'
// import Chat from '../components/Chat'
import RequestStatus from '../../static/RequestStatus';
import AddLineModal from '../components/AddLineModal'

import AddLinesSection from '../components/AddLinesSection'
import MatchPreviews from '../components/MatchPreviews'
import SearchBar from '../components/SearchBar'
import { getMatchData, getPULForName, addLineToDB, sendMessage } from '../../actions/Actions'
import { connect } from 'react-redux';
import MatchDisplay from '../components/MatchDisplay'


class AppPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null,
            selectedLine: null,
            showAddLineModal: false,
            searchTerm: "",
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

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
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
        const { matchData, matchLines, addLineStatus, sendMessageStatus } = this.props;
        const { searchTerm, selectedMatch, selectedLine, showAddLineModal } = this.state;
        if (matchData.requestStatus === RequestStatus.UNINITIALIZED || matchData.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return (
            <div className="app-container">
                {this.renderAddLineModal({ showAddLineModal })}
                <div className="preview-container" id="style-15">
                    <MatchPreviews searchTerm={searchTerm} matchData={matchData} selectMatch={this.selectMatch} />
                </div>
                <div className="search-bar-container">
                    <SearchBar searchTerm={searchTerm} onChange={this.handleChange} ></SearchBar>
                </div>
                <div className="page-container">
                    <MatchDisplay
                        selectedMatch={selectedMatch}
                        matchLines={matchLines}
                        selectLine={this.selectLine}
                        openAddLineModal={this.openAddLineModal}>
                    </MatchDisplay>
                    <AddLinesSection
                        selectedMatch={selectedMatch}
                        matchLines={matchLines}
                        selectLine={this.selectLine}
                        openAddLineModal={this.openAddLineModal}>
                    </AddLinesSection>
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
    matchMessages: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,

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
        getPULForName
    }
)(AppPage);

