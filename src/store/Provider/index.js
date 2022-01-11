import React, { useEffect } from "react";

import Context from "../Context";

import useStorage from "../../utils/useStorage";

import api from "../../services/api";

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage("token");
  const [user, setUser] = useStorage("user");
  // localStorage.removeItem("token");
  useEffect(() => {
    if (token && !user) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      (async () => {
        api.get("/sanctum/csrf-cookie").then((response) => {
          api.get("/api/user").then((response) => {
            if (response.status === 200 && response.data) {
              setUser(response.data);
            }
          });
        });
      })();
    }
  });

  const handleLogout = () => {
    if (token) {
      (() => {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        api.get("/sanctum/csrf-cookie").then((response) => {
          api.post("/logout").then((response) => {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
          });
        });
      })();
    }
  };

  return (
    <Context.Provider value={{ token, setToken, user, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export default StoreProvider;
