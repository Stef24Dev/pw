import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGraphData } from '../services/Services.ts';

export default function LineGraph( props: { 
    endpoint: string
}) {
    const { endpoint } = props;
    const HOST = 'http://localhost:5000/';
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getGraphData(endpoint);
            if (result) {
                setData(result);
            } else {
                setData([]);
            }
        }
        fetchData();
    }, []);

    const bars = (data) => {
        if (data.length === 0) return null;

        const keys = Object.keys(data[0]).filter(key => key !== 'name');
        const colors = ['#03045E', '#023E8A', '#0077b6', '#00b4d8', '#90E0EF']

        const Bars = keys.map((key, index) => {
            return <Bar 
            dataKey={key}
            key={key}
            fill= {colors[index % colors.length]}
            activeBar={<Rectangle fill="pink" stroke="blue" />} 
            />
        })
        return Bars
    }

    return <>
        <div className='graph'> 
            <ResponsiveContainer width={"100%"} height={"90%"}>       
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
                    <XAxis dataKey={'name'} textAnchor={'end'} interval={0} angle= {-40} />
                    <YAxis />
                    <Tooltip shared={false} trigger={"click"} />
                    <Legend 
                        layout={"horizontal"} 
                        verticalAlign={"bottom"} 
                        align={"center"} 
                        wrapperStyle={{ paddingTop: 40 }}
                    />
                    {bars(data)}
                </BarChart>
            </ResponsiveContainer>
        </div>
    </>
}