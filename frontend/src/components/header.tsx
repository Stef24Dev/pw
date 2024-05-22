import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './navbar.tsx';
import "../styles/index.css";
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import * as Icon from 'react-bootstrap-icons'


export default function HeaderStef() {
    return <>
        <Container fluid>
            <Row className="ciao">
                <Col xs="auto" className="menu">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-menu">
                            <Icon.List size = {20}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/">Home page</Dropdown.Item>
                            <Dropdown.Item href="/nazionale">Nazionale</Dropdown.Item>
                            <Dropdown.Item href="/regionale">Regionale</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="titolo">Analisi della presenza Fibra e FWA in Italia</Col>
            </Row>
        </Container>
    </>
}