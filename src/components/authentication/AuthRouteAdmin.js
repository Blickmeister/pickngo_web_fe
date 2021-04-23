import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../services/authentication/AuthenticationService';

class AuthRouteAdmin extends Component {

    render() {
        if (AuthenticationService.getLoggedInUserRole() === 'Admin') {
            return <Route {...this.props} />
        } else {
            return <Redirect to={{pathname: '/', message: 'K pokračování nemáte potřebná oprávnění'}} />
        }

    }
}

export default AuthRouteAdmin;
