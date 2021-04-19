import React, {Component} from 'react';
import AuthenticationService from "../../services/authentication/AuthenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            role: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            message: '',
            isActive : true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    componentDidMount() {
        this.setState({message: this.props.message});
        console.log(this.props.message);
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    };

    loginClicked() {
        console.log(this.state.username + " " + this.state.password);
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                window.location = '/';
            })
            .catch(() => {
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginFailed: true})
            })
    }

    handleDismiss() {
        this.setState({isActive: false})
    }

    render() {
        let renderMessage = false;
        if (this.props.message !== undefined) {
            renderMessage = true;
        }
        return (
            <div className="login-container">
                <h1>Přihlášení</h1>
                {renderMessage && this.state.isActive &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{this.props.message}</strong>
                    <button onClick={() => this.handleDismiss()} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}

                <div className="login-form">
                    {this.state.hasLoginFailed &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Holy guacamole!</strong> Zadali jste špatné přihlašovací údaje. Zkuste to znovu.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    {this.state.showSuccessMessage &&
                    <div>
                        <p>Přihlášení bylo úspěšné</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}

                    <div className="form-group">
                        <input type="text" name="username" value={this.state.username} className="form-control" onChange={this.handleChange} placeholder="Uživatelské jméno" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange} placeholder="Heslo" required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.loginClicked}>Přihlásit se</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
