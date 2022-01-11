import { useContext, useEffect } from "react";

import * as B from "react-bootstrap";

import { Link } from "react-router-dom";

import Products from "../../components/Products";

import api from "../../services/api";

import useStorage from "../../utils/useStorage";

import StoreContext from "../../store/Context";

const Main = () => {
  const { token, user, handleLogout } = useContext(StoreContext);
  const [products, setProducts] = useStorage("products");

  useEffect(() => {
    (async () => {
      await api.get("/sanctum/csrf-cookie").then(() => {
        api.get("/produtos").then((response) => setProducts(response.data));
      });
    })();
  }, [setProducts]);

  return (
    <>
      <B.Container className="d-flex vh-100">
        <div className="m-auto align-self-center text-center">
          <h1>Página Inicial</h1>
          {token && <h3>Seu Token: {token}</h3>}
          {user && <h3>Seu Nome: {user.name}</h3>}
          <hr />
          <div className="text-center">
            <Link
              to="/login"
              className="btn btn-success"
              style={{ margin: "5px 10px" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ margin: "5px 10px" }}
            >
              Cadastre-se
            </Link>
            <B.Button onClick={handleLogout} className="btn btn-danger">
              Logout
            </B.Button>
          </div>
          <hr />

          <Products products={products} />
        </div>
      </B.Container>
    </>
  );
};

export default Main;
