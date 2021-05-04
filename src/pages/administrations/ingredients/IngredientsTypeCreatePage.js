import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../../../services/authentication/AuthenticationService";
import {createIngredientType} from "../../../constants/endpoints";

class IngredientsTypeCreatePage extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        const name = data.get("name");
        console.log("name: " + name);
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
            fetch(createIngredientType, {
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
                    alert("Nový typ ingrediencí byl vytvořen");
                    window.location = '/administration/ingredients/type/create';
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

    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="forms">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Název typu ingrediencí" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Vytvořit nový typ ingrediencí
                </Button>
            </Form>
        )
    }
}

export default IngredientsTypeCreatePage;