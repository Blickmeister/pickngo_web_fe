import React, {Component} from 'react';
import '../../../styles/Forms.css';
import {getIngredients,updateIngredient} from "../../../constants/endpoints";
import IngredientsDataComponent from "../../../components/ingredients/IngredientsDataComponent";
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";


class IngredientsEditPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            ingredients: [],
            nameChanged: false,
            priceChanged: false,
            ingredientTypeChanged: false,
            loading: true

        }
    }

    componentDidMount() {
        this.getData();
        // získání dat ze serveru každých 10 vteřin
        setInterval(this.getData, 10000)
    }

    getData = () => {
        fetch(getIngredients, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ingredients: jsonResponse, loading: false});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("event: " + event.target.value + event.target.name);
        if(event.target.name === "nazev") {
            this.setState({nameChanged: true})
        } else if(event.target.name === "cena") {
            this.setState({priceChanged: true})
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let urlRequestParam = "";
        console.log(this.state.nameChanged + this.state.priceChanged);
        if(this.state.nameChanged) urlRequestParam = "?name=" + data.get("name");
        if(this.state.priceChanged) urlRequestParam = "?price=" + data.get("price");
        if(this.state.ingredientTypeChanged) urlRequestParam = "?ingredientType=" + data.get("ingredientType");
        //tady si myslím, že bude asi ta header jinak, ale nevím jak
        fetch(updateIngredient + this.props.match.params.id + urlRequestParam, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
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
        const { ingredients, loading } = this.state;
        return (
            <div className="tables">
                <h2>
                    Seznam ingrediencí
                </h2>
                {loading
                    ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>
                    : <IngredientsDataComponent data={ingredients}/>
                }
            </div>
        );
    }
}

export default IngredientsEditPage;
