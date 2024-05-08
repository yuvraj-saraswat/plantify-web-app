import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../Styles/Vendor.css";

function Vendor() {
  const { vendor, isLoading } = useAuth();
  /*if (!user.isAdmin) {
    return <Navigate to="/" />;
  }*/
  return (
    <div className="vendor-panel">
      <nav>
        <ul>
          <li>
            <NavLink to="/vendor/nursery">Nurseries</NavLink>
          </li>
          <li>
            <NavLink to="/vendor/orders">Orders</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Vendor;
