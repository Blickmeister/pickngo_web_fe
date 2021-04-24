import React, {Component} from 'react';
import '../../styles/Table.css';

class BaguetteDataComponent extends Component {

    header = ["Název", "Množství", "Cena"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableBody() {
        return this.props.baguetteData.items.map((item, index) => {
            const {ingredient, amount, price} = item;

            return (
                <tr key={index}>
                    <td>{ingredient.name}</td>
                    <td>{amount}</td>
                    <td>{price} Kč</td>
                </tr>
            )
        })
    }

    render() {
        let renderTable = this.props.baguetteData.items.length !== 0; // nemělo by nastat
        return (
            <div className="container-margin-top" style={{padding: '2%'}}>
                <h3 className="float-left">Bageta č.{this.props.index}</h3>
                <div style={{paddingTop: '4%'}}>
                <p className="float-left font-weight-bold">Vybrané ingredience:</p>
                {renderTable &&
                <table className="table table-main-border">
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableBody()}
                    </tbody>
                </table>
                }
                </div>
                <p className="float-right">Celková cena bagety: {this.props.baguetteData.price} Kč</p>
            </div>
        )
    }
}

export default BaguetteDataComponent;
