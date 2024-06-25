import React, { useEffect, useState } from "react";
import { RegionDropdown, YearDropdown } from "../components/Dropdown.tsx";
import { getGraphData, postGraphData } from "../services/Services.ts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PianiFwaRegion( props: { 
    endpoint: string
} ) {
    const [selectedRegion, setSelectedRegion] = useState();
    const [selectedYear, setSelectedYear] = useState();

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    }
    const handleYearChange = (year) => {
        setSelectedYear(year);
    }

    const { endpoint } = props;
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            let result;

            if(selectedRegion === undefined){
                result = await getGraphData(endpoint);
            } else {
                result = await postGraphData(endpoint, selectedRegion, selectedYear);
            }

            if (result) {
                setData(result);
            } else {
                setData([]);
            }
        }
        fetchData();
    }, [selectedRegion, selectedYear]);

    const bars = (data) => {
        if (data.length === 0) return null;

        const keys = Object.keys(data[0]).filter(key => key !== 'name');
        const colors = ['#03045E', '#023E8A', '#0077b6', '#00b4d8', '#90E0EF']

        const Bars = keys.map((key, index) => {
            return <Bar 
            dataKey={key}
            key={key}
            fill= {colors[index % colors.length]}/>
        })
        return Bars
    }

    return <>
        <div className="containerDiv">
            <RegionDropdown key={"PianiFibraRegion"} onRegionChange={handleRegionChange} />
            <YearDropdown key={"PianiFibraRegion_Anno"} onYearChange={handleYearChange} />
        </div>
        <div className='graph'> 
            <ResponsiveContainer width={"100%"} height={"100%"}>       
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
                    <XAxis dataKey={'name'} textAnchor={'end'} interval={0} angle= {-40}/>
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

export default PianiFwaRegion;