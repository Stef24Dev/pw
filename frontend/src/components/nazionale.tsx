import React from "react";
import { Accordion, Button } from "react-bootstrap";
import LineGraph from "./graph.tsx";

export default function Nazionale() {
    return <>
        Ciao sono in nazionale
        <Button onClick={async () => {}}>Ciao</Button>

        {/* Si può mettere l'accordion in un div per non estenderlo del tutto */}

        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Primo grafico</Accordion.Header>
                <Accordion.Body>
                    <LineGraph />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
                <Accordion.Header>Secondo grafico</Accordion.Header>
                <Accordion.Body>
                    Grafico 2
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>
}

// TODO: al posto del console.log sarebbe perfetto fare la chiamata API e quando si apre stampare un icona di caricamento finchè non si crea il grafico

// function CustomToggle({ children, eventKey }) {
//     const decoratedOnClick = useAccordionButton(eventKey, () =>
//       console.log('totally custom!'),
//     );
  
//     return (
//       <button
//         type="button"
//         style={{ backgroundColor: 'pink' }}
//         onClick={decoratedOnClick}
//       >
//         {children}
//       </button>
//     );
//   }