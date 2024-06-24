import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import LineGraph from "./LineGraph.tsx";
import PieGraph from "./PieGraph.tsx";
import MyDropdown from "./Dropdown.tsx";
import { getProperties } from "../services/Services.ts";

export default function Regionale() {
    const HOST = 'http://localhost:5000/';
    const URL = HOST +  'regionale'
    const [endPoints, setEndpoints] = useState({});
    const [selectedYear, setSelectedYear] = useState();

    const components = [
        <LineGraph endpoint={'cantieri_fwa_region'} region={'Lombardia'}/>,
        <PieGraph endpoint={'cantieri_fwa_region_anno'} region={'Lombardia'}/>,
        <LineGraph endpoint={'piani_fwa_region'} region={'Lombardia'} year={selectedYear}/>,
        <LineGraph endpoint={'piani_fibra_region'} region={'Lombardia'} year={selectedYear}/>
    ]

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
        
        const data = keys.map((key:string, index) => {
            {console.log(endPoints[key])}
            return <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ')}</Accordion.Header>
                <Accordion.Body key={key}>
                    {index > 1 ? <MyDropdown key={key} onYearChange={handleYearChange} /> : null}
                    {components[index]}
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