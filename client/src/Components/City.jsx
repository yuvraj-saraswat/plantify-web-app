import React from 'react';
import "./Styles/City.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link , useParams} from 'react-router-dom';

export default function City() {
  const { cityId } = useParams();
    const [nurseries, setNurseries] = useState([]);
    const [cityInfo, setCityInfo] = useState({});

    useEffect(() => {
      axios.get(`http://localhost:3000/api/nurseries/${cityId}`)
        .then(response => setNurseries(response.data))
        .catch(error => console.error('Error fetching nurseries:', error));

        axios.get(`http://localhost:3000/api/cities/${cityId}`)
        .then(response => setCityInfo(response.data))
        .catch(error => console.error('Error fetching city information:', error));
    }, [cityId]);


  return (
      <>
      <div className="hero-section">
        <img src={cityInfo.photo_url}></img>
      <div className="hero-content">
        
        <h1>{cityInfo.name}</h1>
        <h3>{cityInfo.tag}</h3>
      </div>
    </div>
    <div class="card-list">

    {nurseries.map(nursery => (
           <div className="card">
           <img src={nursery.photo_url} />
           <div className="card-content">
             <h1>{nursery.name}</h1>
             <h5><b>Location :</b> {nursery.location}</h5>
             <Link to={`/nursery/${nursery.nursery_id}`}>
              <button>Go to</button>
              </Link>
              
           </div>
         </div>
          ))}
    </div>
    </>
    
  );
};
