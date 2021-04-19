import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import '../../App.css';

class NavigationBar extends Component {

    render() {
        return (
            <Navbar expand="lg" className="main_navbar">
                <Navbar.Brand>PICKnGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ flex: 1, paddingLeft: '1%'}}>
                        <div className="row float-left">
                            <Nav.Item>
                                <Nav.Link href="#">Příchozí objednávky</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#">Historie objednávek</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/administration">Správa systému</Nav.Link>
                            </Nav.Item>
                        </div>
                        <div className="ml-auto float-right">
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-dark" href="#">Odhlásit se</Nav.Link>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default withRouter(NavigationBar);
