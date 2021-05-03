import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../../services/authentication/AuthenticationService";
import {updateIngredient} from "../../constants/endpoints";

class IngredientsDataComponent extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    header = ["ID ingredience", "Upravitelná data"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    };

    renderTableBody() {
        return this.props.data.map((ingredient, index) => {
            const {id, name, price, ingredientType} = ingredient;

            return (
                <tr key={index}>
                    <td>ID: {id} <p>Typ ingredience (ID): {ingredientType.id} </p> <p>Typ ingredience (název): {ingredientType.name} </p></td>

                    <td>
                        <Form className="forms" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Název</Form.Label>
                                <Form.Control defaultValue={name} name="name" type="text" placeholder="Název" required onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Cena v kč</Form.Label>
                                <Form.Control defaultValue={price} name="price" type="number" placeholder="Cena v kč" required onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control defaultValue={id} name="id" placeholder="ID" type="hidden" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control defaultValue={ingredientType.id} name="ingredientType"  placeholder="ID" type="hidden" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Upravit ingredienci
                            </Button>
                        </Form>
                    </td>
                </tr>
            )
        })
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("event: " + event.target.value + event.target.name);
        if(event.target.name === "name") {
            this.setState({nameChanged: true})
        } else if(event.target.name === "price") {
            this.setState({priceChanged: true})
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let urlRequestParam = data.get("id");
        urlRequestParam = urlRequestParam + "?name=" + data.get("name");
        urlRequestParam = urlRequestParam + "&price=" + data.get("price");
        urlRequestParam = urlRequestParam + "&ingredientTypeId=" + data.get("ingredientType");
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(updateIngredient + urlRequestParam , {
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
                    alert("Ingredience byla upravena");
                    window.location = "/administration/ingredients";
                } else {
                    console.error(response.message);
                    alert("Ingredience se nepodařila upravit");
                }
            }).catch(function (error) {
            console.error(error);
            alert("Ingredience se nepodařila upravit");
        });

    };
    render() {
        return (
            <div>
                <table id='tables'>
                    <tbody style={{backgroundColor: 'white'}}>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableBody()}
                    </tbody>
                </table>
            </div>
        )
    };
}

export default IngredientsDataComponent;
