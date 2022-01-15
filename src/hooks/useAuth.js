import { useEffect } from "react";
import api from "../services/api";
import useStorage from "../utils/useStorage";

const useAuth = () => {
  const [token, setToken] = useStorage("token");
  const [user, setUser] = useStorage("user");

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    if (token && !user) {
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
        api.get("/sanctum/csrf-cookie").then((response) => {
          api.post("/api/logout").then((response) => {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
          });
        });
      })();
    }
  };

  return { token, setToken, user, handleLogout };
};

export default useAuth;
