import React, { useState } from "react";
import "../App.css";
import "./Styles/Navbar.css";
import menu from "./Images/menu.png";
import logo from "./Images/Mainlogo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./store/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { toast } from "react-toastify";

export default function Navbar() {
  const { isLoggedIn, user, vendor } = useAuth();
  console.log("wow",vendor.isAdmin);
  let link = "/user";
  if(vendor.isAdmin){
    link="/vendor/nursery";
  }
  return (
    <>
      <div className="Navbar">
        <Link to="/" className="title">
          <div className="Logo">
            <img src={logo} />
          </div>
        </Link>
        <div className="Links">
          <ul>
            <li>
              <NavLink to="/cities">Services</NavLink>
            </li>
            <li>
              <NavLink to="/uc">Memberships</NavLink>
            </li>
            <li>
              <NavLink to="/uc">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/uc">About</NavLink>
            </li>

            <input placeholder="Search..." />

            {isLoggedIn ? (
              <>
                <NavLink
                  title={user.username}
                  to={link}
                  className="AccountCircle"
                >
                  <AccountCircleIcon
                    style={{ fontSize: "2.5rem", color: "#2A5752" }}
                  />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button>Sign In</button>
                </NavLink>
                <NavLink to="/register">
                  <button>Register</button>
                </NavLink>
              </>
            )}
          </ul>
          <img src={menu} />
        </div>
      </div>
    </>
  );
}
