import React, {Component} from 'react';
import '../../styles/Container.css';
import AuthenticationService from "../../services/authentication/AuthenticationService";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const username = AuthenticationService.getLoggedInUserName();
        const roleName = AuthenticationService.getLoggedInUserRole();
        return (
            <div className="welcome-container">
                <h1>Vítejte v systému PICKnGO v roli {roleName}</h1>
                <p>Přihlášený uživatel: {username}</p>
            </div>
        )
    }
}

export default WelcomeComponent;
