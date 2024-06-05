import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getGraphData } from '../services/Services.ts';

export default function PieGraph( props: { 
    endpoint: string
}) {
    const { endpoint } = props;
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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      console.log("DOADOASIOSAID = ", data[index][Object.keys(data[index])[0]])
    
      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(2)}% - ${data[index][Object.keys(data[index])[0]]}`}
        </text>
      );
    };

    return <>
        <div className='graph'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value">

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    </>


}
