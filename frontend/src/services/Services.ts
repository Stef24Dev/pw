import axios from "axios";

const HOST = 'http://localhost:5000/';

export async function getEndPoints(property: string) {
    const URL = HOST +  property;

    try{
        const response = await axios.get(URL);
        return response.data;
    } catch (error){
        console.error("ERRORE: ", error);
        return error;
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

export async function postGraphData(endpoint: string, region: string, year?: number) {
    const graphUrl = HOST + endpoint;

    const requestBody = {
        region: region,
    }

    if (year !== undefined){
        requestBody['year'] = Number(year);
    }

    try{
        console.log("graph ", graphUrl, " reqyest ", requestBody)
        const response = await axios.post(graphUrl, requestBody);
        
        const formattedData: object[] = Object.keys(response.data).map(status => {
            return {
                "name": status,
                ...response.data[status]
            };
        });
        console.log("Response di getGraphData ", formattedData, " per url: ", graphUrl, " con anno ", year);
        return formattedData;
    } catch (error) {
        console.error("Errore è = ", error);
    }
}