import React from "react";
import { Alert } from "react-bootstrap";

export default function NetworkAlert( props: {
    error: object
}) {
    const { error } = props;
    
    return <>
        <Alert variant={"danger"} className="containerDiv">
            Error: {error['message']} <br/>
            Probably Web server is not active
        </Alert>
    </>
}