import React, {Component} from 'react';
import AuthenticationService from "../../../services/authentication/AuthenticationService";
import {getAccountUrl} from "../../../constants/endpoints";
import AccountDataComponent from "../../../components/account/AccountDataComponent";
import Loader from 'react-loader-spinner';
import {Link} from "react-router-dom";

class AccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilesData: [],
            loading : true,
        };
    }

    componentDidMount() {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(getAccountUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({profilesData: jsonResponse, loading : false});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    render() {
        const { profilesData, loading } = this.state;
        // aktuálně přihlášený uživatel na 1. řádku
        let actualAccountData = {};
        const actualUserLogin = AuthenticationService.getLoggedInUserName();
        for(let i = 0; i < profilesData.length; i++) {
            if(profilesData[i].login === actualUserLogin) {
                actualAccountData = profilesData[i];
                profilesData.splice(i, 1);
            }
        }

        return (
            <div className="tables">
                <h2>
                    Přehled účtů
                </h2>
                <Link className="btn btn-primary" to="/administration/account/create">Vytvořit uživatelský účet</Link>
                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                    <AccountDataComponent data={profilesData} actualAccountData={actualAccountData}/>
                }
            </div>
        );
    }
}

export default AccountPage;
