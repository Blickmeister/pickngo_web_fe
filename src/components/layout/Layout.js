import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
    <Container className="content-container">
        {props.children}
    </Container>
);
