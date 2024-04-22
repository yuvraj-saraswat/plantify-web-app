import React from "react";
import Login from "./Login";

function UserLogin() {
  const header = "User Login";
  const apiEndpoint = "http://localhost:3000/api/auth/login";
  const linkDescription = "Login as Vendor?";
  const link = "/vendorLogin"
  return (
    <Login
      header={header}
      apiEndpoint={apiEndpoint}
      linkDescription={linkDescription}
      link={link}
    />
  );
}

export default UserLogin;
