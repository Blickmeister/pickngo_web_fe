import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/cjs/Button";
import AuthenticationService from '../../services/authentication/AuthenticationService';
import {removeAccountUrl} from "../../constants/endpoints";
import '../../styles/Button.css'

class AccountDataComponent extends Component {

    header = ["Login", "Jméno", "Přijmení", "Role", "Možnosti"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableData() {
        return this.props.data.map((account, index) => {
            const {id, firstname, lastname, login, employeeRole} = account;
            const newTo = {
                pathname: "/administration/account/edit/" + id,
            };
            return (
                <tr key={index}>
                    <td>{login}</td>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{employeeRole.name}</td>
                    <td>
                        <Link className="btn btn-info button-margin" to={newTo}>Upravit</Link>
                        <Button className="btn btn-danger button-margin" onClick={() => this.handleDelete(id)}>Smazat</Button>
                    </td>
                </tr>
            )
        })
    }

    handleDelete = (id) => {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(removeAccountUrl + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Účet byl úspěšně smazán");
                    window.location = '/administration/account';
                } else {
                    console.error(response.message);
                    alert("Účet se nepodařilo smazat");
                }
            }).catch(function (error) {
            console.error(error);
            alert("Účet se nepodařilo smazat");
        });
    };

    render() {
        const actualAccount = this.props.actualAccountData;
        const newTo = {
            pathname: "/administration/account/edit/" + actualAccount.id,
        };
        return (
            <div>
                <table id='tables'>
                    <tbody style={{backgroundColor: 'white'}}>
                    <tr>{this.renderTableHeader()}</tr>
                    <tr>
                        <td>{actualAccount.login}</td>
                        <td>{actualAccount.firstname}</td>
                        <td>{actualAccount.lastname}</td>
                        <td>{actualAccount.employeeRole.name}</td>
                        <td>
                            <Link className="btn btn-info button-margin" to={newTo}>Upravit</Link>
                            <Button className="btn btn-danger button-margin" onClick={() => this.handleDelete(actualAccount.id)}>Smazat</Button>
                        </td>
                    </tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }


}

export default AccountDataComponent;
