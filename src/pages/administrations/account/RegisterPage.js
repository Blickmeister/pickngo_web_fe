import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../../../services/authentication/AuthenticationService";
import {createAdminUrl, createEmployeeUrl, getRolesUrl} from "../../../constants/endpoints";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allRoles: [],
            roleToSend: '',
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        this.setState({username: username});
        this.setState({password: password});

        fetch(getRolesUrl, {
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
                this.setState({allRoles: jsonResponse})
            }).catch((err) => console.error(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        const roleName = data.get("roleName");
        console.log("role name: " + roleName);
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        // fetch dle role
        if (roleName === 'admin') {
            fetch(createAdminUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization' : AuthenticationService.createBasicAuthToken(username, password)
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("Účet byl vytvořen");
                    window.location = '/administration/account';
                } else {
                    response.json().then(function (res) {
                        alert(res.message)
                    })
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        } else {
            fetch(createEmployeeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                      'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                     'authorization' : AuthenticationService.createBasicAuthToken(username, password)
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    response.json().then((json) => console.log("JSON: " + json.id));
                    alert("Účet byl vytvořen");
                    window.location = '/administration/account';
                } else {
                    response.json().then(function (res) {
                        alert(res.message)
                    })
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        }
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="forms">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control name="firstname" type="text" placeholder="Vaše jméno" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Přijmení</Form.Label>
                    <Form.Control name="lastname" type="text" placeholder="Vaše přijmení" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control name="login" type="text" placeholder="Váš login" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Zadejte Vaše heslo" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="roleName" as="select" required>
                        {this.state.allRoles.map((role, index) => {
                            return (
                                <option key={index}>{role.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit účet
                </Button>
            </Form>
        )
    }
}

export default RegisterPage;
