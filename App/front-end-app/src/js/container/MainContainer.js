import React from 'react';
import Login from '../components/Login'
import EnterPhoneNumber from '../components/EnterPhoneNumber'
import AppPage from './AppPage'
import PropTypes from 'prop-types';
import { getToken, sendSmsText } from '../../actions/Actions'
import tinderToken from '../../reducers/tinderToken'
import smsMessage from '../../reducers/smsMessage'
import { connect } from 'react-redux';
import RequestStatus from '../../static/RequestStatus';



class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoadingPage: true, showAppPage: false, loginError: false, number: "" };
    }

    handleSendSms = (number) => {
        this.setState({ number })
        this.props.sendSmsText(number)
    }

    handleLogin = (code, req_code) => {
        const number = this.state.number;
        this.props.getToken({ number, code, req_code });
    }

    renderAppPage = ({ tinderToken }) => {
        if (tinderToken.requestStatus === RequestStatus.SUCCEEDED) {
            return (<AppPage token={tinderToken.value}></AppPage>)
        }
    }

    renderLoginPage = ({ tinderToken, smsMessage }) => {
        if (smsMessage.requestStatus === RequestStatus.SUCCEEDED) {
            if (tinderToken.requestStatus === RequestStatus.SUCCEEDED) {
                return null
            }
            return (
                <Login smsMessage={smsMessage} tinderToken={tinderToken} handleLogin={this.handleLogin}></Login>
            )

        }
    }

    renderSmsPage = ({ smsMessage }) => {
        if (smsMessage.requestStatus === RequestStatus.SUCCEEDED) {
            return null
        }

        return (
            <EnterPhoneNumber smsMessage={smsMessage} handleSendSms={this.handleSendSms}></EnterPhoneNumber>
        )
    }

    render() {
        const { tinderToken, smsMessage } = this.props;

        return (
            <div>
                {this.renderSmsPage({ smsMessage })}
                {this.renderLoginPage({ tinderToken, smsMessage })}
                {this.renderAppPage({ tinderToken })}</div>
        );

    }
}

MainContainer.propTypes = {
    tinderToken: PropTypes.object.isRequired,
    smsMessage: PropTypes.object.isRequired,
}

export default connect(
    ({ tinderToken, smsMessage }) => ({
        tinderToken,
        smsMessage
    }),
    {
        sendSmsText,
        getToken,
    }
)(MainContainer);

