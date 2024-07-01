import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/index.css";
import * as Icon from 'react-bootstrap-icons'


// export default function FooterStef() {
//     return <>
//         <footer className="bg_footer">
//             <Row className="justify-content-center">
//                 <Col xs="auto" className="footer_content">
//                     <a href="https://github.com/Stef24Dev">
//                         <Icon.Github size = {50}/>
//                     </a>
//                 </Col>
//                 <Col xs="auto" className="footer_content">
//                     <a href="mailto:stefanmuntianu2@gmail.com">
//                         <Icon.Envelope size = {50}/>
//                     </a>
//                 </Col>
//             </Row>
//         </footer>
//     </>
// }

export default function FooterStef() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;
            if (scrollTop + windowHeight >= documentHeight - 10) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`bg_footer ${isVisible ? 'visible' : 'hidden'}`}>
            <Row className="justify-content-center">
                <Col xs="auto" className="footer_content">
                    <a href="https://github.com/Stef24Dev" target="_blank" rel="noopener noreferrer">
                        <Icon.Github size={50} />
                    </a>
                </Col>
                <Col xs="auto" className="footer_content">
                    <a href="mailto:stefanmuntianu2@gmail.com">
                        <Icon.Envelope size={50} />
                    </a>
                </Col>
            </Row>
        </footer>
    );
}