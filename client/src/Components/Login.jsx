import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./store/auth";
import { toast } from "react-toastify";
import "./Styles/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";

export default function Login({ header, apiEndpoint, linkDescription, link }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({
          email: "",
          password: "",
        });
        toast.success("Logged in");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Invalid credentials");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className="auth-box">
        <div className="registration-form">
          <h1 className="main-heading mb-3">{header}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                val={user.email}
                onChange={handleInput}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                val={user.password}
                onChange={handleInput}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Login Now
            </button>
            
          </form>
          <Link to ={link}>{linkDescription}</Link>
        </div>
      </div>
    </>
  );
}
