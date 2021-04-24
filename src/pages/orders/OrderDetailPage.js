import React, {Component} from 'react';
import {getBaguetteOrderDetailUrl, updateBaguetteOrderUrl} from "../../constants/endpoints";
import '../../styles/Table.css';
import BaguetteDataComponent from "../../components/orders/BaguetteDataComponent";
import Button from "react-bootstrap/cjs/Button";
import {Link} from "react-router-dom";
import AuthenticationService from "../../services/authentication/AuthenticationService";

class OrderDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderData: {},
            baguetteItems: [],
            loading: true
        };
    }

    componentDidMount() {
        console.log("ID order: " + this.props.match.params.id);

        fetch(getBaguetteOrderDetailUrl + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({orderData: jsonResponse, baguetteItems: jsonResponse.baguetteItems, loading: false});
            }).catch((err) => console.error(err));
    }

    changeOrderState = (order) => {
        // inkrementace state
        console.log("order state to put: " + ++order.state);

        // změna state objednávky na BE
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(updateBaguetteOrderUrl + order.id + "?state=" + order.state, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(username, password)
            },
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Úspěšná změna stavu objednávky " + order.id);
                    window.location = '/order/incoming';
                } else {
                    response.json().then(function (res) {
                        alert("Chyba při změně stavu objednávky: " + res.message)
                    })
                }
            }).then(function (text) {
        }).catch(function (error) {
            console.error(error);
            alert("Chyba při změně stavu objednávky: " + error)
        });
    };

    render() {
        // TODO
        const {orderData, baguetteItems} = this.state;
        let renderReadyButton = false;
        if (orderData.state === 2) {
            renderReadyButton = true;
        }
        return (
            <div className="container text-center">
                <h1>Detail objednávky</h1>
                <div className="align-items-center">
                    <div className="panel panel-info align-items-center text-center">
                        <div className="panel-heading">
                            <h2 className="panel-title">ID: {orderData.id}</h2>
                            <p className="text-warning">Čas vytvoření: {orderData.date}</p>
                            <p className="text-warning">Poznámka: {orderData.note}</p>
                        </div>
                        <div className="panel-body">
                            {
                                baguetteItems.map((baguette, index) => {
                                    return (
                                        <BaguetteDataComponent baguetteData={baguette} index={++index}/>
                                    )
                                })
                            }
                            <div style={{paddingTop: '2%'}}>
                                <p className=" float-right font-weight-bold">
                                    Celková cena celé objednávky: {orderData.price} Kč</p>

                                    {renderReadyButton &&
                                    <Button className="btn btn-success button-margin float-left"
                                            onClick={() => this.changeOrderState(orderData)}>Připraveno</Button>
                                    }
                                    <Link className="btn btn-primary button-margin float-left" to="/order/incoming">Zpět na přehled
                                        objednávek</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetailPage;
