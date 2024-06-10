import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const data = [
  { name: 'Label1', value: 12, color: 'red' },
  { name: 'Label2', value: 19, color: 'blue' },
  { name: 'Label3', value: 3, color: 'green' }
];

const years = [2020, 2021, 2022, 2023, 2024]; // da fare chiamata API per gli anni

const MyDropdown = ({ onYearChange }) => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(years[0]); // Imposta l'anno iniziale

  useEffect(() => {
    // const fetchData = async (year) => {
    //   try {
    //     const response = await axios.get(`/api/data?year=${year}`);
    //     setData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data", error);
    //   }
    // };
    // fetchData(selectedYear);
    onYearChange(selectedYear);
  }, [selectedYear, onYearChange]);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  return (
    <DropdownButton id="dropdown-basic-button" title={`Select Year: ${selectedYear}`} onSelect={handleSelectYear}>
      {years.map((year, index) => (
        <Dropdown.Item key={index} eventKey={year}>
          {year}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default MyDropdown;
