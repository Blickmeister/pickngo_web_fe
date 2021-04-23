import React, {Component} from 'react';
import {getBaguetteOrderDetailUrl} from "../../constants/endpoints";
import '../../styles/Table.css';

class OrderDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderData: {},
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
                this.setState({orderData: jsonResponse, loading: false});
            }).catch((err) => console.error(err));
    }

    render() {
        // TODO
        const orderData = this.state.orderData; // .baqOrder mapovat pak mapovat .items a tam uz jsou ingredience
        return (
            <div className="container text-center">
                <h1>Detail objednávky</h1>
                <div className="align-items-center">
                    <div className="panel panel-info align-items-center text-center">
                        <div className="panel-heading">
                            <h2 className="panel-title">ID: {orderData.id}</h2>
                        </div>
                        <div className="panel-body">
                            <h3 className="float-left">Ingredience:</h3>
                            <table className="table table-user-information">
                                <tbody>
                                <tr>
                                    <th>Název</th>
                                    <th>Množství</th>
                                    <th>Cena za položku</th>
                                </tr>
                                <tr>
                                    <td><b></b></td>
                                    <td>hovno</td>
                                </tr>
                                <tr>
                                    <td><b>asd</b></td>
                                    <td>hovno</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetailPage;
