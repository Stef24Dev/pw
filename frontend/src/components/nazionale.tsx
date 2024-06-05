import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import LineGraph from "./LineGraph.tsx";
import axios from "axios";
import PieGraph from "./PieGraph.tsx";
import { getEndPoints } from "../services/Services.ts";

export default function Nazionale() {
    const [endPoints, setEndpoints] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getEndPoints('nazionale');
            if (result) {
                setEndpoints(result);
            } else {
                setEndpoints([]);
            }
        }
        fetchData();
    }, [])

    const acordion = (info:object) => {
        
        const keys = Object.keys(info);
        console.log(keys);
        
        if (keys.length === 0) return null;
        
        const data = keys.map((key:string) => {
            {console.log(endPoints[key])}
            return <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ')}</Accordion.Header>
                <Accordion.Body>
                    {endPoints[key] === 'line' ? <LineGraph endpoint={key}/> : <PieGraph endpoint={key}/>}
                </Accordion.Body>
            </Accordion.Item>
        });
        return data;
    }

    return <>
        Ciao sono in nazionale
        <Button onClick={async () => {console.log("Hello ", endPoints)}}>Ciao</Button>

        <div className="containerDiv">
            <div className="accordionContainer">
                <Accordion>
                    {acordion(endPoints)}
                </Accordion>
            </div>
        </div>
    </>
}