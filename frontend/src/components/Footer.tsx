import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/index.css";
import * as Icon from 'react-bootstrap-icons'


export default function FooterStef() {
    return <>
        <Row className="bg_footer justify-content-center">
            <Col xs="auto" className="footer_content">
                <a href="https://github.com/Stef24Dev">
                    <Icon.Github size = {50}/>
                </a>
            </Col>
            <Col xs="auto" className="footer_content">
                <a href="mailto:stefanmuntianu2@gmail.com">
                    <Icon.Envelope size = {50}/>
                </a>
            </Col>
        </Row>
    </>
}