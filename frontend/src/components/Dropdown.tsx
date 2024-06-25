import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, DropdownMenu } from 'react-bootstrap';
import { getProperties, getRegion } from '../services/Services.ts';
import axios from 'axios';

let years = [2020, 2021, 2022, 2023];

const YearDropdown = ({ onYearChange }) => {
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    onYearChange(selectedYear);
  }, [selectedYear, onYearChange]);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  return (
    <DropdownButton id="dropdown-basic-buttonYear" title={`Select Year: ${selectedYear}`} onSelect={handleSelectYear}>
      {years.map((year, index) => (
        <Dropdown.Item key={index} eventKey={year}>
          {year}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

const RegionDropdown = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const regions = await getRegion('get_region')
      setData(regions);
    };

    fetchData();

    onRegionChange(selectedRegion);
  }, [selectedRegion, onRegionChange]);

  const handleSelectRegion = (Region) => {
    setSelectedRegion(Region);
  };

  return (
    <DropdownButton id="dropdown-basic-button" title={`Select Region: ${selectedRegion !== undefined ? selectedRegion : "Not selected"}`} onSelect={handleSelectRegion} className='dropdown'>
        {data.map((region, index) => (
          <Dropdown.Item key={index} eventKey={region}>
            {region}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

export { YearDropdown, RegionDropdown };
