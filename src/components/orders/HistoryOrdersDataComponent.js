import React, {Component} from 'react';
import {Link} from "react-router-dom";

class HistoryOrdersDataComponent extends Component {

    // TODO stav jen pro kontrolu, pak pryc
    header = ["ID objednávky", "Čas objednávky", "Poznámka", "Jméno zákazníka", "Celková cena", "Stav", "Možnosti"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableBody() {
        return this.props.data.map((order, index) => {
            const {id, date, note, customer, price, state} = order;

            // odkaz do Detail page
            const toDetail = {
                pathname: "/order/detail/" + id,
                toHistoryPage: true
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

export default HistoryOrdersDataComponent;
