import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Main from "../../pages/Main";

import * as Auth from "../../components/Auth";

import StoreProvider from "../../store/Provider";

import StoreContext from "../../store/Context";

import api from "../api";

const PrivateWrapper = () => {
  const { token } = useContext(StoreContext);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const Routes = () => {
  return (
    <Router>
      <StoreProvider>
        <Switch>
          <Route path="/" element={<PrivateWrapper />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/login" element={<Auth.Login />} />
          <Route path="/register" element={<Auth.Register />} />
        </Switch>
      </StoreProvider>
    </Router>
  );
};

export default Routes;
