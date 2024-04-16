import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import town from './Images/town.png';
import './Styles/Cities.css';

const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cities')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  return (
    <div className="city-main">
      <h1>Available Cities</h1>
      <div className='city-list'>
        {cities.map(city => (
            <Link to={`/nurseries/${city.city_id}`}>
              <div className='city-card'>
                <img src={town}></img>
                <b>{city.name}</b>
              </div>
            </Link>  
        ))}
      </div>
    </div>
  );
};

export default Cities;
