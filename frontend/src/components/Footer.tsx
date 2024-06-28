import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/index.css";
import * as Icon from 'react-bootstrap-icons'


export default function FooterStef() {
    return <>
        <Row className="bg_footer justify-content-center">
            <Col xs="auto" className="footer_content">
                <Icon.Github size = {50}/>
            </Col>
            <Col xs="auto" className="footer_content">
                <Icon.Envelope size = {50}/>
            </Col>
        </Row>
    </>
}