import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class IngredientsDataComponent extends Component {

    header = ["ID ingredience", "Typ ingredience", "Název ingredience", "Cena"];

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
                    <td>ID: {id}</td>
                    <td>Typ: {ingredientType}</td>
                    <td>
                        <Form className="forms" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Název</Form.Label>
                                <Form.Control defaultValue={name} name="name" type="text" placeholder="name" required onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Cena v kč</Form.Label>
                                <Form.Control defaultValue={price} name="price" type="number" placeholder="price" required onChange={this.handleChange}/>
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
    };
}

export default IngredientsDataComponent;
