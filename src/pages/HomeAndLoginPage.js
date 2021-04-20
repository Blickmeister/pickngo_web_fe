import React, {Component} from 'react';
import '../styles/Login.css';
import AuthenticationService from "../services/authentication/AuthenticationService";
import WelcomeComponent from "../components/layout/WelcomeComponent";
import LoginComponent from "../components/authentication/LoginComponent";

class HomeAndLoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserLoggedIn : false
        };
    }

    componentDidMount() {
        let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        this.setState({isUserLoggedIn: isUserLoggedIn})
        console.log(this.state.isUserLoggedIn)
    }


    render() {
        const {isUserLoggedIn} = this.state;
        return (
            <div>
            {isUserLoggedIn ? <WelcomeComponent/> : <LoginComponent message={this.props.location.message}/>}
            </div>
        )
    }

}

export default HomeAndLoginPage;
