import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import CantieriFwaRegion from "../regions/cantieriFwaRegion.tsx";
import CantieriFwaRegionAnno from "../regions/cantieriFwaRegionAnno.tsx";
import PianiFibraRegion from "../regions/pianiFibraRegion.tsx";
import PianiFwaRegion from "../regions/pianiFwaRegion.tsx";

export default function Regionale() {
    const HOST = 'http://localhost:5000/';
    const URL = HOST +  'regionale'
    const [endPoints, setEndpoints] = useState({});

    const components = [
        <CantieriFwaRegion endpoint={'cantieri_fwa_region'}/>,
        <CantieriFwaRegionAnno endpoint={'cantieri_fwa_region_anno'}/>,
        <PianiFibraRegion endpoint={'piani_fibra_region'}/>,
        <PianiFwaRegion endpoint={'piani_fibra_region'} />
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
    }, []);

    const acordion = (info:object) => {
        
        const keys = Object.keys(info);
        
        if (keys.length === 0) return null;
        
        const data = keys.map((key:string, index) => {
            return <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ')}</Accordion.Header>
                <Accordion.Body key={key}>
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