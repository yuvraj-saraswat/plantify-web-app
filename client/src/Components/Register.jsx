import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./store/auth";
import { toast } from "react-toastify";
import "./Styles/Login.css";

export const Register = ({ header, apiEndpoint, linkDescription, link, navTo }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { storeTokenInLS, API } = useAuth();

  const navigate = useNavigate();

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
        //storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registered Successfully");
        navigate(navTo);
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
      console.log(response);
    } catch (error) {
      console.log("register", error);
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                id="username"
                required
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="phone"
                id="phone"
                required
                value={user.phone}
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
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Register Now
            </button>
          </form>
          <Link to ={link}>{linkDescription}</Link>
        </div>
      </div>
    </>
  );
};
