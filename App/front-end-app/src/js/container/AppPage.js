import React from 'react';
import PropTypes from 'prop-types';

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import MatchSelect from '../components/MatchSelect'
// import Chat from '../components/Chat'
import Messenger from '../chatComponents/Messenger'
import RequestStatus from '../../static/RequestStatus';


import matchData from '../../reducers/matchData'
import matchLines from '../../reducers/matchLines'
import matchMessages from '../../reducers/matchMessages'

import { getMatchData, getMatchMessages, getPULForName } from '../../actions/Actions'
import { connect } from 'react-redux';


class AppPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null,
            selectedLine: null
        };
        this.selectMatch = this.selectMatch.bind(this);
        this.selectLine = this.selectLine.bind(this);
    }

    componentDidMount() {
        const token = this.props.token;
        this.props.getMatchData(token)
    }

    selectMatch(selectedMatch) {
        this.setState({ selectedMatch })
        const token = this.props.token;
        this.props.getPULForName(selectedMatch.name);
        this.props.getMatchMessages(token, selectedMatch.match_id);
    }

    selectLine(lineText) {
        const name = this.state.selectedMatch.name;
    }

    render() {
        const { matchData, matchMessages, matchLines } = this.props;
        const { selectedMatch } = this.state;
        if (matchData.requestStatus === RequestStatus.UNINITIALIZED || matchData.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return (
            <Messenger
                selectMatch={this.selectMatch}
                matchData={matchData.value}
                matchMessages={matchMessages}
                selectedMatch={selectedMatch}
                matchLines={matchLines}
                selectLine={this.selectLine}>
            </Messenger>

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
    ({ matchData, matchMessages, matchLines }) => ({
        matchData,
        matchMessages,
        matchLines,
    }),
    {
        getMatchData,
        getMatchMessages,
        getPULForName
    }
)(AppPage);

