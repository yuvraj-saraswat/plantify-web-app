import React from "react";
import Login from "./Login";

function UserLogin() {
  const header = "User Login";
  const apiEndpoint = "http://localhost:3000/api/auth/login";
  const linkDescription = "Login as Vendor?";
  const link = "/vendorLogin"
  const navTo = "/cities"
  return (
    <Login
      header={header}
      apiEndpoint={apiEndpoint}
      linkDescription={linkDescription}
      link={link}
      navTo = {navTo}
    />
  );
}

export default UserLogin;
