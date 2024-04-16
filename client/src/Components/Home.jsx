import React from 'react'
import '../App.css';
import './Styles/Home.css';
import plants from './Images/plants.jpg';
import plantup from './Images/Plantup.png';
import plantdown from './Images/plantdown.png';
import {Link, NavLink} from 'react-router-dom';

export default function Home() {
  return (
  <>
    <div className='Home'>
      <div className='Title'>
      <img id="up" src={plantup}/>
        <h1>Discover a World <br/>of Green Delights</h1>
        <p>Unearth the beauty of nature as you explore <br/>a curated collection of nurseries and plants near you.</p>       
        <Link to="/cities" className='explore'><button>Explore</button></Link>
        <img id = "down" src={plantdown}/>
      </div>
      <div className='ImageH'>
       <img src={plants} />
        <div className='Quote'>"The love of gardening is a seed once sown that never dies." - Gertrude Jekyll</div>
      </div>
    </div>
  </>
  )
}
