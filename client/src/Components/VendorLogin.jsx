import React from "react";
import Login from "./Login";

function VendorLogin() {
  const header = "Vendor Login";
  const apiEndpoint = "http://localhost:3000/api/auth/vendor-login";
  const linkDescription = "Login as User?";
  const link = "/login";
  return (
    <Login
      header={header}
      apiEndpoint={apiEndpoint}
      linkDescription={linkDescription}
      link={link}
    />
  );
}

export default VendorLogin;
