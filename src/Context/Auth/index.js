import { createContext } from "react";
import useAuth from "../../hooks/useAuth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { token, setToken, user, handleLogout } = useAuth();
  return (
    <AuthContext.Provider value={{ token, setToken, user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
