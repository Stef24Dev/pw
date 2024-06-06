import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import LineGraph from "./LineGraph.tsx";
import PieGraph from "./PieGraph.tsx";
import { getEndPoints } from "../services/Services.ts";
import NetworkAlert from "./NetworkAlert.tsx";

export default function Nazionale() {
    const [endPoints, setEndpoints] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await getEndPoints('nazionale');

            if (result['name'] !== 'AxiosError') {
                setEndpoints(result);
                setIsConnected(true);
            } else {
                setEndpoints([]);
                setError(result);
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
                <Accordion.Body className="pie">
                    {endPoints[key] === 'line' ? <LineGraph endpoint={key}/> : <PieGraph endpoint={key}/>}
                </Accordion.Body>
            </Accordion.Item>
        });
        return data;
    }

    return <>
        <div className="containerDiv">
            <div className="accordionContainer">
                <Accordion>
                    {isConnected ? acordion(endPoints) : <NetworkAlert error={error}/>}
                </Accordion>
            </div>
        </div>
    </>
}