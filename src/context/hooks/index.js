import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ id: null, name: "", email: "" });
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    authenticated &&
      (async () => {
        setUser(
          (({ created_at, updated_at, email_verified_at, ...params }) =>
            params)((await api.get("/api/user")).data)
        );
      })();
  }, []);

  const HandleLogout = () => {
    api.post("/logout");
    navigate("/");
  };

  localStorage.removeItem("token");

  return (
    <Context.Provider
      value={{
        authenticated: authenticated,
        token: token,
        user: user,
        HandleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Context, AuthProvider };
