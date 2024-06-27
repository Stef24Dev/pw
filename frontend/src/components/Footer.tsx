import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/index.css";
import Dropdown from 'react-bootstrap/Dropdown';
import * as Icon from 'react-bootstrap-icons'


export default function FooterStef() {
    return <>
        <Container fluid>
            <Row className="bg_footer">
                <Col xs="auto" className="contact">
                    You can contact me on
                </Col>
                <Col className="titolo">Analisi della presenza Fibra e FWA in Italia</Col>
            </Row>
        </Container>
    </>
}