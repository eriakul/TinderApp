import React from 'react';
import Login from '../components/Login'
import AppPage from './AppPage'
import PropTypes from 'prop-types';
import { getToken } from '../../actions/Actions'
import tinderToken from '../../reducers/tinderToken'
import { connect } from 'react-redux';
import RequestStatus from '../../static/RequestStatus';



class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoadingPage: true, showAppPage: false, loginError: false };
    }

    handleLogin = (email, password) => {
        console.log("handling login", email, password);

        this.props.getToken(email, password);
    }

    renderAppPage = ({ tinderToken }) => {
        if (tinderToken.requestStatus === RequestStatus.SUCCEEDED) {
            return (<AppPage token={tinderToken.value}></AppPage>)
        }
    }

    renderLoginPage = ({ tinderToken, isPending }) => {
        if (tinderToken.requestStatus === RequestStatus.SUCCEEDED) {
            return null
        }
        return (
            <Login isPending={isPending} handleLogin={this.handleLogin}></Login>
        )
    }

    render() {
        const { tinderToken } = this.props;
        console.log(tinderToken)

        const isPending = tinderToken.requestStatus === RequestStatus.PENDING;

        return (
            <div>{this.renderLoginPage({ tinderToken, isPending })}
                {this.renderAppPage({ tinderToken })}</div>
        );

    }
}

MainContainer.propTypes = {
    tinderToken: PropTypes.object.isRequired,
}

export default connect(
    ({ tinderToken }) => ({
        tinderToken
    }),
    {
        getToken
    }
)(MainContainer);

