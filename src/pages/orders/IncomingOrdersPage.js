import React, {Component} from 'react';
import {getBaguetteOrdersUrl} from "../../constants/endpoints";
import IncomingOrdersDataComponent from '../../components/orders/IncomingOrdersDataComponent';
import Loader from 'react-loader-spinner';

class IncomingOrdersPage extends Component {

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
        fetch(getBaguetteOrdersUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
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

        // vytažení pouze objednávek, které nejsou již vyřízeny
        let incomingOrders = [];
        let index = 0;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].state === 1 || orders[i].state === 2 || orders[i].state ===  3) {
                incomingOrders[index] = orders[i];
                index++;
            }
        }
        // seřazení dle času (nejstarší objednávka první)
        let incomingOrdersSortByDate = incomingOrders.sort((a, b) => a.date > b.date ? 1 : -1);

        return (
            <div className="tables">
                <h1>
                    Seznam příchozích objednávek
                </h1>

                {loading
                    ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>
                    : <IncomingOrdersDataComponent data={incomingOrdersSortByDate}/>
                }
            </div>
        )
    }
}

export default IncomingOrdersPage;
