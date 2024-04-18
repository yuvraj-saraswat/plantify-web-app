import React, { useEffect, useState } from "react";
import { useAuth } from "./store/auth";
import { Link, NavLink } from "react-router-dom";
import "./Styles/User.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

function User() {
  const { user } = useAuth();
  /*const { user, userAuthentication } = useAuth(); 
    // Assuming useAuth returns a loading state

    useEffect(() => {
        if (user.length===0) {
            // Fetch user data again if user is empty
            userAuthentication();
        }
    }, [ user]);*/
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
      <div className="cart-container">
        <h1>Cart</h1>
        <div className="cart-contents">
          <ProductionQuantityLimitsIcon
            style={{ fontSize: "10rem", color: "#2A5752" }}
          />
          <i>Wow, So Empty!!</i>
        </div>
      </div>

      <NavLink to="/logout">
        <button>Log Out</button>
      </NavLink>
    </div>
  );
}

export default User;
