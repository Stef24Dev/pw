import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const stringa = `            TODO: SIstemare i titoli, l'andare a capo e tutto quanto <br />
Introduzione
Il progetto Banda Ultra Larga (BUL) rappresenta un fondamentale pilastro nell'evoluzione delle infrastrutture di connettività, mirando a fornire accesso ad Internet ad alta velocità a una vasta gamma di utenti. In questo contesto, l'obiettivo principale di questo progetto Jupyter è condurre un'analisi dettagliata dei dati relativi alla copertura, alla qualità del servizio e seguire i lavori di avanzamento per due tecnologie chiave: la Fibra Ottica (FTTH) e il Fixed Wireless Access (FWA).

Obbiettivo
Questa analisi si propone di fornire una panoramica dello stato attuale del progetto BUL, con particolare attenzione alle tecnologie di connettività e ai lavori dei cantieri. Speriamo che le conclusioni tratte da questa analisi possano essere utili.

Introduzione del progetto
In questa parte importiamo le librerie che ci serviranno durante il progetto e il DataFrame da un file '.csv'.

Glossario per lo stato dei cantieri
In progettazione

Vuol dire che il piano non è ancora stato emesso o che è stato emesso ma il progetto del cantiere è ancora in progettazione.
In esecuzione

Vuol dire che il cantiere è in esecuzione.
Terminato

Vuol dire che il cantiere è chiuso e la fibra o è in collaudo per il test o è già stata collaudata, quindi funzionante.
In funzione

Vuol dire che la fibra è in funzione con lavori terminati e collaudati.`

export default function Home() {
    return <>
        <div className="home">
            <p>TODO: SIstemare i titoli, l'andare a capo e tutto quanto <br />
            Introduzione
            Il progetto Banda Ultra Larga (BUL) rappresenta un fondamentale pilastro nell'evoluzione delle infrastrutture di connettività, mirando a fornire accesso ad Internet ad alta velocità a una vasta gamma di utenti. In questo contesto, l'obiettivo principale di questo progetto Jupyter è condurre un'analisi dettagliata dei dati relativi alla copertura, alla qualità del servizio e seguire i lavori di avanzamento per due tecnologie chiave: la Fibra Ottica (FTTH) e il Fixed Wireless Access (FWA).<br />

            Obbiettivo
            Questa analisi si propone di fornire una panoramica dello stato attuale del progetto BUL, con particolare attenzione alle tecnologie di connettività e ai lavori dei cantieri. Speriamo che le conclusioni tratte da questa analisi possano essere utili.<br />

            Introduzione del progetto
            In questa parte importiamo le librerie che ci serviranno durante il progetto e il DataFrame da un file '.csv'.<br />
            <br />
            Glossario per lo stato dei cantieri
            In progettazione<br />
            Vuol dire che il piano non è ancora stato emesso o che è stato emesso ma il progetto del cantiere è ancora in progettazione.<br />
            In esecuzione<br />
            Vuol dire che il cantiere è in esecuzione.<br />
            Terminato<br />
            Vuol dire che il cantiere è chiuso e la fibra o è in collaudo per il test o è già stata collaudata, quindi funzionante.<br />
            In funzione<br />

            Vuol dire che la fibra è in funzione con lavori terminati e collaudati</p>
        </div>
        <Row>
            <Col className="choice">Analisi sulla Fibra ed FWA a livello nazionale</Col>
            <Col className="choice">Analisi sulla Fibra ed FWA a livello regionale</Col>
        </Row>
    </>
}