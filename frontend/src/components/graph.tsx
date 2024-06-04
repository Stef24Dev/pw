import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineGraph({ name }) {
    const LOCAL_HOST = 'http://localhost:5000';
    const URL = LOCAL_HOST +  `/${name}`
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(URL);
                const formattedData: object[] = Object.keys(response.data).map(status => {
                    return {
                        "name": status,
                        ...response.data[status]
                    }
                });
                setLoading(false);
                setData(formattedData);
            } catch (error) {
                console.error("Errore: ", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const bars = (data) => {
        if (data.length === 0) return null;

        const keys = Object.keys(data[0]).filter(key => key !== 'name');
        const colors = ['#03045E', '#023E8A', '#0077b6', '#00b4d8', '#90E0EF']

        const Bars = keys.map((key, index) => {
            {console.log("entro con key", key)}
            return <Bar 
            dataKey={key}
            fill= {colors[index % colors.length]}
            activeBar={<Rectangle fill="pink" stroke="blue" />} 
            />
        })
        return Bars
    }

    if (loading) {
        return <p>Loading....</p>
    }

    return <>
        <div className='graph'> 
            <ResponsiveContainer width="100%" height="100%">       
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 50,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={'name'} textAnchor= "end" interval={0} angle= {-40} />
                    <YAxis />
                    <Tooltip shared={false} trigger="click" />
                    <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center" 
                        wrapperStyle={{ paddingTop: 40 }}
                    />
                    {bars(data)}
                </BarChart>
            </ResponsiveContainer>
        </div>
    </>
}