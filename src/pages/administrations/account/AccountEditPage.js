import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../styles/Forms.css';
import AuthenticationService from "../../../services/authentication/AuthenticationService";
import {getAccountDetailUrl, getRoleDetailUrl, getRolesUrl, updateAccountUrl} from "../../../constants/endpoints";

class AccountEditPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            allRoles: [],
            accountToEdit: {},
            firstnameChanged: false,
            lastnameChanged: false,
            roleChanged: false,
            empRole: {}
        }
    }

    componentDidMount() {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        console.log("ID:" + this.props.match.params.id);
        fetch(getAccountDetailUrl + this.props.match.params.id, {
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
                this.setState({accountToEdit: jsonResponse});
                this.setState({empRole: jsonResponse.employeeRole});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

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
                this.setState({allRoles: jsonResponse});
            }).catch((err) => console.error(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("eventos: " + event.target.value + event.target.name);
        if(event.target.name === "firstname") {
            this.setState({firstnameChanged: true})
        } else if(event.target.name === "lastname") {
            this.setState({lastnameChanged: true})
        }
    };

    handleChangeRoleId = (event) => {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(getRoleDetailUrl + event.target.value, {
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
                this.setState({empRole : jsonResponse})
            }).catch((err) => console.error(err));
        this.setState({roleChanged: true})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let urlRequestParam = "";
        console.log(this.state.firstnameChanged + this.state.lastnameChanged + this.state.roleChanged);
        if(this.state.firstnameChanged) urlRequestParam = "?firstname=" + data.get("firstname");
        if(this.state.lastnameChanged) {
            if(urlRequestParam === "") urlRequestParam = "?lastname=" + data.get("lastname");
            else urlRequestParam = urlRequestParam + "&lastname=" + data.get("lastname");
        }
        if(this.state.roleChanged) {
            if(urlRequestParam === "") urlRequestParam = "?roleId=" + data.get("roleId");
            else urlRequestParam = urlRequestParam + "&roleId=" + data.get("roleId");
        }


        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(updateAccountUrl + this.props.match.params.id + urlRequestParam, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Účet byl upraven");
                    window.location = "/administration/account";
                } else {
                    console.error(response.message);
                    alert("Účet se nepodařilo upravit");
                }
            }).catch(function (error) {
            console.error(error);
            alert("Účet se nepodařilo upravit");
        });
    };

    render() {
        const {firstname, lastname} = this.state.accountToEdit;
        const {id, name} = this.state.empRole;
        console.log(name);
        return (
            <Form className="forms" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control defaultValue={firstname} name="firstname" type="text" placeholder="firstName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Příjmení</Form.Label>
                    <Form.Control defaultValue={lastname} name="lastname" type="text" placeholder="lastName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control value={id} name="roleId" as="select" required onChange={this.handleChangeRoleId}>
                        {this.state.allRoles.map((role, index) => {
                            return (
                                <option key={index} value={role.id}>{role.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default AccountEditPage;
