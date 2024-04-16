import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {Route, Routes} from 'react-router-dom';
import City from './Components/City';
import Cities from './Components/Cities';
import Nursery from './Components/Nursery';
import UC from './Components/UC';
import Login from './Components/Login';
import { Register } from './Components/Register';
import { Logout } from './Components/Logout';
import User from './Components/User';


function App() {
  
  return (
    <>
    <div className='FullScreen'>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/uc" element={ <UC/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path="/nurseries/:cityId" element={<City/>} />
          <Route path="/nursery/:nurseryId" element={<Nursery/>} />
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>    
      </div>
    </div>
    </>
  );
}
export default App;
