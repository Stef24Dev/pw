import axios from "axios";

const HOST = 'http://localhost:5000/';

export async function getEndPoints(property: string) {
    const URL = HOST +  property;

    try{
        const response = await axios.get(URL);
        console.log("Response di getEndPoint ", response.data);
        return response.data;
    } catch (error){
        console.error("ERRORE: ", error);
    }
}

export async function getGraphData(endpoint: string) {
    const graphUrl = HOST + endpoint;
    console.log("chiamata a: ", graphUrl);

    try{
        const response = await axios.get(graphUrl);
        const formattedData: object[] = Object.keys(response.data).map(status => {
            return {
                "name": status,
                ...response.data[status]
            };
        });
        console.log("Response di getGraphData ", formattedData);
        return formattedData;
    } catch (error) {
        console.error("Hai un errore: ", error);
    }
}