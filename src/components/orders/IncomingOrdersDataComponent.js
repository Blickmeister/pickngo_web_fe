import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../../styles/Table.css';
import '../../styles/Container.css';
import '../../styles/Button.css';
import {updateBaguetteOrderUrl} from "../../constants/endpoints";
import AuthenticationService from "../../services/authentication/AuthenticationService";

class IncomingOrdersDataComponent extends Component {

    // TODO Poznámka nebo čas vyzvednutí? a stav jen pro kontrolu, pak pryc
    header = ["ID objednávky", "Čas objednávky", "Poznámka", "Jméno zákazníka", "Celková cena", "Stav", "Možnosti"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    makeAction(order) {
        console.log("ID order to put: " + order.id);
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

    renderTableBody() {
        return this.props.data.map((order, index) => {
            const {id, date, note, customer, price, state} = order;

            let actionButton;
            if (state === 1) {
                actionButton =
                    <Button className="btn btn-info button-margin" onClick={() => this.makeAction(order)}>
                        Potvrdit
                    </Button>
            } else if (state === 2) {
                actionButton =
                    <Button className="btn btn-success button-margin" onClick={() => this.makeAction(order)}>
                        Připraveno
                    </Button>
            } else if (state === 3) {
                actionButton =
                    <Button className="btn btn-danger button-margin" onClick={() => this.makeAction(order)}>
                        Vyřízeno
                    </Button>
            }

            // odkaz do Detail page
            const toDetail = {
                pathname: "/order/detail/" + id
            };

            return (
                <tr key={index}>
                    <td>{id}</td>
                    <td>{date}</td>
                    <td>{note}</td>
                    <td>{customer.name}</td>
                    <td>{price} Kč</td>
                    <td>{state}</td>
                    <td>
                        <Link className="btn btn-primary button-margin" to={toDetail}>Detail</Link>
                        {actionButton}
                    </td>
                </tr>
            )
        })
    }

    render() {
        let renderTable = this.props.data.length !== 0;
        return (
            <div>
                {renderTable &&
                <table id='tables'>
                    <tbody style={{backgroundColor: 'white'}}>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableBody()}
                    </tbody>
                </table>
                }
            </div>
        )
    }
}

export default IncomingOrdersDataComponent;
