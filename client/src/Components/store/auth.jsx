import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [vendor, setVendor] = useState("");
  const [services, setservices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser("");
    setVendor("");
    //toast.success("Logged Out");
    return localStorage.removeItem("token");
  };

  //JWT Authentication- to get the currently loggedIN user data

  const userAuthentication = async () => {
    try {
      if (token) {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();

          await setUser(data.userData);

          console.log(user.userdata + "Aaaaa");
        } else {
          console.log("error fetching user data");
        }
      }
    } catch (error) {
      console.log("Error fetching user Data");
    } finally {
      setIsLoading(false);
    }
  };

  const vendorAuthentication = async () => {
    try {
      if (token) {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/auth/vendor-details", {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();

          await setVendor(data.userData);

          //console.log(vendor.userdata + "Aaaaa");
        } else {
          console.log("error fetching user data");
        }
      }
    } catch (error) {
      console.log("Error fetching user Data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
    vendorAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        vendor,
        authorizationToken,
        isLoading,
        userAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
