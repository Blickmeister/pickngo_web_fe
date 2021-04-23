import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import '../../App.css';
import AuthenticationService from "../../services/authentication/AuthenticationService";

class NavigationBar extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <Navbar expand="lg" className="main_navbar">
                <Navbar.Brand><Nav.Link href="/" style={{color: 'black'}}>PICKnGO</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ flex: 1, paddingLeft: '1%'}}>
                        <div className="row float-left">
                            <Nav.Item>
                                <Nav.Link href="/order/incoming">Příchozí objednávky</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/order/history">Historie objednávek</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/administration">Správa systému</Nav.Link>
                            </Nav.Item>
                        </div>
                        <div className="ml-auto float-right">
                            {isUserLoggedIn &&
                                <Link className="btn btn-outline-primary" to="/logout"
                                          onClick={AuthenticationService.logout}>Odhlásit se</Link>
                            }
                            {!isUserLoggedIn &&
                            <Link className="btn btn-outline-primary" to="/">
                                Přihlásit se</Link>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default withRouter(NavigationBar);
