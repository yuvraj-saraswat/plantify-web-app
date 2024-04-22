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
import VendorLogin from './Components/VendorLogin';
import UserLogin from './Components/UserLogin';
import UserRegister from './Components/UserRegister';
import VendorRegister from './Components/VendorRegister';
import Vendor from './Components/VendorComponents/Vendor';
import VendorNursery from './Components/VendorComponents/VendorNursery';
import VendorPlant from './Components/VendorComponents/VendorPlant';
import Order from './Components/VendorComponents/Order';


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
          <Route path="/login" element = {<UserLogin/>}/>
          <Route path="/vendorLogin" element = {<VendorLogin/>}/>
          <Route path="/register" element = {<UserRegister/>}/>
          <Route path="/vendorRegister" element = {<VendorRegister/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/vendor" element={<Vendor/>}>
            <Route path="nursery" element = {<VendorNursery/>}/>
            <Route path="plants" element = {<VendorPlant/>}/>
            <Route path="orders" element={<Order/>}/>
          </Route>
        </Routes>    
      </div>
    </div>
    </>
  );
}
export default App;
