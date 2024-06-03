import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LOCAL_HOST = 'http://localhost:5000';
const URL = LOCAL_HOST +  '/cantieri_italia_fibra'

export default function LineGraph() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(URL)
            .then(response => {
                let myData = response.data;
                console.log(myData);
                let myObj = {};

                for(let ciao in myData){
                    console.log(ciao)
                }

                let ciao = [
                    {
                        name: response.data
                    }
                ]
                setData(response.data)
            })
    }, []);

    return <>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="In esecuzione" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="In proggettazione" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            <Bar dataKey="Terminati" fill="#82c49d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    </>
}