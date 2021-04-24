import React, {Component} from 'react';
import '../styles/Login.css';
import AuthenticationService from "../services/authentication/AuthenticationService";
import WelcomeComponent from "../components/layout/WelcomeComponent";
import LoginComponent from "../components/authentication/LoginComponent";

class HomeAndLoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserLoggedIn : false,
            isActive : true
        };
    }

    componentDidMount() {
        let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        this.setState({isUserLoggedIn: isUserLoggedIn});
        console.log(this.state.isUserLoggedIn)
    }

    handleDismiss() {
        this.setState({isActive: false})
    }

    render() {
        let renderMessage = false;
        if (this.props.location.message !== undefined) {
            renderMessage = true;
        }
        const {isUserLoggedIn} = this.state;
        return (
            <div>
                {renderMessage && this.state.isActive &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{this.props.location.message}</strong>
                    <button onClick={() => this.handleDismiss()} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
            {isUserLoggedIn ? <WelcomeComponent/> : <LoginComponent/>}
            </div>
        )
    }

}

export default HomeAndLoginPage;
