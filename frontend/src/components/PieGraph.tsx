import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getGraphData, postGraphData } from '../services/Services.ts';

export default function PieGraph( props: { 
    endpoint: string,
    region?: string,
    year?: number
}) {
    const { endpoint, region, year } = props;
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            let result;

            if(region === undefined){
                result = await getGraphData(endpoint);
            } else {
                result = await postGraphData(endpoint, region, year);
            }

            if (result) {
                setData(result);
            } else {
                setData([]);
            }
        }
        fetchData();
    }, [endpoint, region, year]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS_NAME = ['blue', 'green', 'yellow', 'orange'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      );
    };

    const renderLabels = () => {
        return data.map((name, index) => {
            return <text key={index} className={`label ${COLORS_NAME[index]}`}>
                {`${data[index][Object.keys(data[index])[0]]}`}
            </text>
        });
    }

    return <>
        <div className='graph'>
            <div className='labels-container'>
                {renderLabels()}
            </div>
            <ResponsiveContainer width='100%' height='100%'>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    </>


}
