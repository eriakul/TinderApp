import React from 'react';
import PropTypes from 'prop-types';

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import MatchSelect from '../components/MatchSelect'
// import Chat from '../components/Chat'
import Messenger from '../chatComponents/Messenger'
import RequestStatus from '../../static/RequestStatus';


import matchData from '../../reducers/matchData'
import { getMatchData } from '../../actions/Actions'
import { connect } from 'react-redux';


class AppPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedMatch: null
        };
    }

    componentDidMount() {
        const token = this.props.token;
        this.props.getMatchData(token)
    }

    render() {
        const { matchData } = this.props;
        console.log(matchData)
        if (matchData.requestStatus === RequestStatus.UNINITIALIZED || matchData.requestStatus === RequestStatus.PENDING) {
            return null
        }
        return (
            <Messenger matchData={matchData.value}></Messenger>

        );
    }
}


AppPage.propTypes = {
    matchData: PropTypes.object.isRequired,
    getMatchData: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
}

export default connect(
    ({ matchData }) => ({
        matchData
    }),
    {
        getMatchData
    }
)(AppPage);

