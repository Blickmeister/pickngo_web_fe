import React, {Component} from 'react';
import {getBaguetteOrdersUrl} from "../../constants/endpoints";
import Loader from "react-loader-spinner";
import HistoryOrdersDataComponent from "../../components/orders/HistoryOrdersDataComponent";
import AuthenticationService from "../../services/authentication/AuthenticationService";

class HistoryOrdersPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
        // získání dat ze serveru každých 10 vteřin
        setInterval(this.getData, 10000)
    }

    getData = () => {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(getBaguetteOrdersUrl, {
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
                this.setState({orders: jsonResponse, loading: false});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    };

    render() {
        const {orders, loading} = this.state;

        // vytažení pouze objednávek ve stavu "příchozí"
        let historyOrders = [];
        let index = 0;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].state === 4) {
                historyOrders[index] = orders[i];
                index++;
            }
        }
        // seřazení dle času (nejnovější objednávka první)
        let historyOrdersSortByDate = historyOrders.sort((a, b) => a.date < b.date ? 1 : -1);

        return (
            <div className="tables">
                <h1>
                    Seznam vyřízených objednávek
                </h1>

                {loading
                    ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>
                    : <HistoryOrdersDataComponent data={historyOrdersSortByDate}/>
                }
            </div>
        )
    }
}

export default HistoryOrdersPage;
