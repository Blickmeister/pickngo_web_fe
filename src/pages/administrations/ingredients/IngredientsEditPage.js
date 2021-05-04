import React, {Component} from 'react';
import '../../../styles/Forms.css';
import {getIngredients,updateIngredient} from "../../../constants/endpoints";
import IngredientsDataComponent from "../../../components/ingredients/IngredientsDataComponent";
import Loader from "react-loader-spinner";
import AuthenticationService from "../../../services/authentication/AuthenticationService";


class IngredientsEditPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            nameChanged: false,
            priceChanged: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(getIngredients, {
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
                this.setState({ingredients: jsonResponse});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    };

    render() {
        const { ingredients } = this.state;

        return (
            <div className="tables">
                <h2>
                    Seznam ingrediencí
                </h2>
                { <IngredientsDataComponent data={ingredients}/>
                }
            </div>
        );
    }
}

export default IngredientsEditPage;
