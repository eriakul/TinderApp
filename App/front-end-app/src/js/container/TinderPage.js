import React from 'react';
import Login from '../components/Login'
import EnterPhoneNumber from '../components/EnterPhoneNumber'
import AppPage from './AppPage'
import PropTypes from 'prop-types';
import { getToken, sendSmsText } from '../../actions/Actions'
import { connect } from 'react-redux';
import RequestStatus from '../../static/RequestStatus';



class TinderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { token: null };
    }

    componentWillMount() {
        let token = JSON.parse(localStorage.getItem("tinderToken"));
        if (token !== null && typeof token === "object") {
            if (token["expiration"] > Math.round((new Date()).getTime() / 1000)) {
                this.setState({ token: token["token"] })
            }
        }
    }

    handleSendSms = (number) => {
        this.setState({ number })
        this.props.sendSmsText(number)
    }

    handleLogin = (code, req_code) => {
        const number = this.state.number;
        this.props.getToken({ number, code, req_code });
    }

    renderAppPage = ({ tinderToken, token }) => {
        if (!token && tinderToken.requestStatus !== RequestStatus.SUCCEEDED) {
            return null
        }
        if (!token) {
            token = tinderToken.value;
        }

        return (<AppPage token={token}></AppPage>)
    }

    renderLoginPage = ({ tinderToken, token, smsMessage }) => {
        if (token) {
            return null
        }
        if (smsMessage.requestStatus === RequestStatus.SUCCEEDED) {
            if (tinderToken.requestStatus === RequestStatus.SUCCEEDED) {
                return null
            }
            return (
                <Login smsMessage={smsMessage} tinderToken={tinderToken} handleLogin={this.handleLogin}></Login>
            )

        }
    }

    renderSmsPage = ({ smsMessage, token }) => {
        if (smsMessage.requestStatus === RequestStatus.SUCCEEDED || token) {
            return null
        }

        return (
            <EnterPhoneNumber smsMessage={smsMessage} handleSendSms={this.handleSendSms}></EnterPhoneNumber>
        )
    }

    render() {
        const { tinderToken, smsMessage } = this.props;
        const { token } = this.state;

        return (
            <div>
                {this.renderSmsPage({ smsMessage, token })}
                {this.renderLoginPage({ tinderToken, smsMessage, token })}
                {this.renderAppPage({ tinderToken, token })}
            </div>
        );

    }
}

TinderPage.propTypes = {
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
)(TinderPage);

