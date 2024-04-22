import React from "react";
import { Register } from "./Register";

function VendorRegister() {
  const header = "Vendor Register";
  const apiEndpoint = "http://localhost:3000/api/auth/vendor-register";
  const linkDescription = "Register as User?";
  const link = "/register";
  return (
    <Register
      header={header}
      apiEndpoint={apiEndpoint}
      linkDescription={linkDescription}
      link={link}
    />
  );
}

export default VendorRegister;
