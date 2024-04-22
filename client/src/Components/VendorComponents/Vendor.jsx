import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Vendor() {
  const { user, vendor,isLoading } = useAuth();
  /*if (!user.isAdmin) {
    return <Navigate to="/" />;
  }*/
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/vendor/nursery">{vendor.username}</NavLink>
        </li>
        <li>
          <NavLink to="/vendor/plants">Plants</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Vendor;
