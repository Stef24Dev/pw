import React from "react";
import { Alert } from "react-bootstrap";

export default function NetworkAlert( props: {
    error: object
}) {
    
    const { error } = props;
    console.log("il mio errore è", error['message']);
    
    return <>
        <Alert variant={"danger"} className="containerDiv">
            Error: {error['message']} <br/>
            Probably Web server is not active
        </Alert>
    </>
}