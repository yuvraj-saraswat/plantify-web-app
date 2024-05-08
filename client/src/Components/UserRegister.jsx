import React from "react";
import { Register } from "./Register";

function UserRegister() {
  const header = "User Register";
  const apiEndpoint = "http://localhost:3000/api/auth/register";
  const linkDescription = "Register as Vendor?";
  const link = "/vendorRegister";
  const navTo = "/login";
  return (
    <Register
      header={header}
      apiEndpoint={apiEndpoint}
      linkDescription={linkDescription}
      link={link}
      navTo={navTo}
    />
  );
}

export default UserRegister;
