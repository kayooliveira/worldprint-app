import { useEffect } from "react";
import * as B from "react-bootstrap";
import { Link } from "react-router-dom";
import Products from "../../components/Products";
import api from "../../services/api";
import useStorage from "../../utils/useStorage";
import useAuth from "../../hooks/useAuth";
const Main = () => {
  const { token, user, handleLogout } = useAuth();

  const [products, setProducts] = useStorage("products");

  useEffect(() => {
    (async () => {
      await api.get("/sanctum/csrf-cookie").then(() => {
        api.get("/api/produtos").then((response) => setProducts(response.data));
      });
    })();
  }, [setProducts]);

  return (
    <>
      <B.Container className="d-flex vh-100">
        <div className="m-auto align-self-center text-center">
          {token && <h3>Seu Token: {token}</h3>}
          {user && <h3>Seu Nome: {user.name}</h3>}
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
          <Products products={products} title="Produtos em destaque" />
        </div>
      </B.Container>
    </>
  );
};

export default Main;
