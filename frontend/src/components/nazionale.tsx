import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import LineGraph from "./graph.tsx";
import axios from "axios";

export default function Nazionale() {
    const LOCAL_HOST = 'http://localhost:5000';
    const URL = LOCAL_HOST +  '/nazionale'

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get(URL);
                console.log(response.data)
                setData(response.data);
            } catch (error){
                console.error("ERRORE: ", error)
            }
        };
        fetchData();
    }, [])

    const acordion = (info) => {
        if (info.length === 0) return null;

        const data = info.map((name:string, index) => {
            return <Accordion.Item eventKey={index}>
                <Accordion.Header>{name.charAt(0).toUpperCase() + name.slice(1).split('_').join(' ')}</Accordion.Header>
                <Accordion.Body>
                    <LineGraph name={name}/>
                </Accordion.Body>
            </Accordion.Item>
        });
        return data;
    }

    return <>
        Ciao sono in nazionale
        <Button onClick={async () => {console.log("Hello")}}>Ciao</Button>

        {/* Si può mettere l'accordion in un div per non estenderlo del tutto */}

        <Accordion>
            {acordion(data)}
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