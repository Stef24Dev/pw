import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import LineGraph from "./LineGraph.tsx";
import PieGraph from "./PieGraph.tsx";

export default function Regionale() {
    const HOST = 'http://localhost:5000/';
    const URL = HOST +  'regionale'
    const [endPoints, setEndpoints] = useState({});

    useEffect(() => {
        const getEndpoints = async() => {
            try{
                const response = await axios.get(URL);
                console.log("Response di getEndPoint ", response.data)
                setEndpoints(response.data);
            } catch (error){
                console.error("ERRORE: ", error)
            }
        };
        getEndpoints();
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
        Ciao sono in regionale

        <div className="containerDiv">
            <div className="accordionContainer">
                <Accordion>
                    {acordion(endPoints)}
                </Accordion>
            </div>
        </div>
    </>
}