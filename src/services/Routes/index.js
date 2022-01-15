import React from "react";
import Main from "../../pages/Main";
import * as Auth from "../../components/Auth";
import useAuth from "../../hooks/useAuth";
import { AuthProvider } from "../../Context/Auth";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateWrapper = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" element={<PrivateWrapper />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/login" element={<Auth.Login />} />
          <Route path="/register" element={<Auth.Register />} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
