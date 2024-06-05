import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function Home() {
    return <>            
        <Container className="home">
            <Row className="choice">
                Introduzione<br /><br />
                Il progetto Banda Ultra Larga (BUL) rappresenta un fondamentale pilastro nell'evoluzione delle infrastrutture di connettività, mirando a fornire accesso ad Internet ad alta velocità a una vasta gamma di utenti.<br />
                In questo contesto, l'obiettivo principale di questo progetto è condurre un'analisi dettagliata dei dati relativi alla copertura, alla qualità del servizio e seguire i lavori di avanzamento per due tecnologie chiave: la Fibra Ottica (FTTH) e il Fixed Wireless Access (FWA).<br /><br />

                Obbiettivo<br /><br />
                Questa analisi si propone di fornire una panoramica dello stato attuale del progetto BUL, con particolare attenzione alle tecnologie di connettività e ai lavori dei cantieri.<br /><br />

                <div className="glossary">
                    Glossario per lo stato dei cantieri<br /><br />

                    In progettazione<br />
                    Vuol dire che il piano non è ancora stato emesso o che è stato emesso ma il progetto del cantiere è ancora in progettazione.<br /><br />
                    
                    In esecuzione<br />
                    Vuol dire che il cantiere è in esecuzione.<br /><br />
                    
                    Terminato<br />
                    Vuol dire che il cantiere è chiuso e la fibra o è in collaudo per il test o è già stata collaudata, quindi funzionante.<br /><br />
                    
                    In funzione<br />
                    Vuol dire che la fibra è in funzione con lavori terminati e collaudati.
                </div>
            </Row>
        </Container>
        <Row>
            <Col>
                <Link className="link" to='/nazionale'>Analisi sulla Fibra ed FWA a livello nazionale</Link>
            </Col>
            <Col>
               <Link className='link' to='/regionale'>Analisi sulla Fibra ed FWA a livello regionale</Link>
            </Col>
        </Row>
    </>
}