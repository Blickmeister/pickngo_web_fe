import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../styles/AdministrationPage.css';

class AdministrationPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Veškerá správa systému</h1>
                <div className="admin-item">
                    <p className="text-body float-left font-weight-bold">Správa uživatelských účtů:</p>
                    <Link to="/administration/account" className="btn btn-dark float-left">Zde</Link>
                </div>
                <div className="admin-item">
                    <p className="text-body float-left font-weight-bold">Správa ingrediencí:</p>
                    <Link to="/administration/ingredients" className="btn btn-dark float-left">Zde</Link>
                </div>
                <div className="admin-item">
                    <p className="text-body float-left font-weight-bold">Přidávání ingrediencí:</p>
                    <Link to="/administration/ingredients/create" className="btn btn-dark float-left">Zde</Link>
                </div>
                <div className="admin-item">
                    <p className="text-body float-left font-weight-bold">Přidávání typů ingrediencí:</p>
                    <Link to="/administration/ingredients/type/create" className="btn btn-dark float-left">Zde</Link>
                </div>
            </div>
        )
    }
}

export default AdministrationPage;
