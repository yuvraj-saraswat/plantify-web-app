import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./store/auth";
import { Link, NavLink } from "react-router-dom";
import "./Styles/User.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

function User() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  /*const { user, userAuthentication } = useAuth(); 
    // Assuming useAuth returns a loading state

    useEffect(() => {
        if (user.length===0) {
            // Fetch user data again if user is empty
            userAuthentication();
        }
    }, [ user]);*/

  useEffect(() => {
    fetchCartDetails();
    console.log("haha", cart);
  }, [user]);

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/cart/get-cart/${user._id}`
      );
      
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };
  
  return (
    <div className="user-container">
      <div className="detail-container">
        <div className="picture">
          <AccountCircleIcon style={{ fontSize: "10rem", color: "#2A5752" }} />
        </div>
        <div className="details">
          <h2>User Details</h2>
          <div>
            <b>Username:</b> {user.username}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Phone:</b> {user.phone}
          </div>
        </div>
      </div>
      <div id="cart-container">
        <h1>Cart</h1>
        <div id="cart-contents">
          {cart=== undefined || cart.sumTotal === 0 ? (
            <>
              <ProductionQuantityLimitsIcon
                style={{ fontSize: "10rem", color: "#2A5752" }}
              />
              <i>Wow, So Empty!!</i>
            </>
          ) : (
            <>
              <ul className="cart-list">
                {cart && cart.cartItems && cart.cartItems.map((item) => (
                  <li>
                    <Link to={`/nursery/${item.nurseryId}`}><h3>Nursery: {item.nursery}</h3></Link>
                    <ul className="plant-list">
                      {cart && cart.cartItems && item.plants.map((plant) => (
                        <li>
                          <div className="cart-plant-pic">
                            <img
                              src={plant.photo_url}
                              alt={plant.plantName}
                              height="80px"
                            />
                          </div>
                          <b>{plant.plantName}</b>
                          <p><b>Quantity:</b> {plant.quantity}</p>
                          <p><b>Price:</b> {plant.price}</p>
                        </li>
                      ))}
                    </ul>
                    <div id="nursery-total"><b>Total: {item.total}</b></div>
                  </li>
                ))}
              </ul>
              <div id ="grand-total"><b>Grand Total: {cart.sumTotal}</b></div>
              <button id="check-out">Check Out</button>
            </>
          )}
        </div>
      </div>

      <NavLink to="/logout">
        <button id="log-out">Log Out</button>
      </NavLink>
    </div>
  );
}

export default User;
