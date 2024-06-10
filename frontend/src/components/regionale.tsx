import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import LineGraph from "./LineGraph.tsx";
import PieGraph from "./PieGraph.tsx";
import MyDropdown from "./Dropdown.tsx";

export default function Regionale() {
    const HOST = 'http://localhost:5000/';
    const URL = HOST +  'regionale'
    const [endPoints, setEndpoints] = useState({});
    
    const years = [2020, 2021, 2022, 2023, 2024]; // Anni disponibili nel dropdown
    const [selectedYear, setSelectedYear] = useState(); // Imposta l'anno iniziale

    useEffect(() => {
        const getEndpoints = async() => {
            try{
                const response = await axios.get(URL);
                setEndpoints(response.data);
            } catch (error){
                console.error("ERRORE: ", error)
            }
        };
        getEndpoints();
    }, [selectedYear]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
    }

    const acordion = (info:object) => {
        
        const keys = Object.keys(info);
        console.log(keys);
        
        if (keys.length === 0) return null;
        
        const data = keys.map((key:string) => {
            {console.log(endPoints[key])}
            return <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ')}</Accordion.Header>
                <Accordion.Body key={key}>
                    <MyDropdown key={key} onYearChange={handleYearChange} />
                    {endPoints[key] === 'line' ? <LineGraph endpoint={key} region={'Lombardia'} year={selectedYear}/> : <PieGraph endpoint={key} region={'Lombardia'} year={selectedYear}/>}
                </Accordion.Body>
            </Accordion.Item>
        });
        return data;
    }

    return <>
        <div className="containerDiv">
            <div className="accordionContainer">
                <Accordion>
                    {acordion(endPoints)}
                </Accordion>
            </div>
        </div>
    </>
}