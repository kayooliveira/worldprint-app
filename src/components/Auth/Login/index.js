import React, { useContext, useEffect, useState } from "react";

import api from "../../../services/api";

import Form from "./Form";

import StoreContext from "../../../store/Context";

import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const initialState = { email: "", password: "" };

  const navigate = useNavigate();

  const { token, setToken } = useContext(StoreContext);

  // REDIRECIONA O USUÁRIO CASO ELE JÁ TENHA UM TOKEN SALVO

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [fields, setFields] = useState(initialState);

  // GERENCIA OS INPUTS

  const handleChange = (input) => {
    setFields({ ...fields, [input.target.name]: input.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginError = () => {
      alert("Ocorreu um erro ao fazer login!");
      setFields(initialState);
    };

    const loginSuccess = (token) => {
      setToken(JSON.stringify(token));
      navigate("/");
    };

    api.get("/sanctum/csrf-cookie").then((response) => {
      api
        .post("/login", fields)
        .then((response) => {
          response.status === 200 && response.data.token
            ? loginSuccess(response.data.token)
            : loginError();
        })
        .catch((error) => {
          alert("Erro ao fazer Login!");
        });
    });

    setFields(initialState);
  };

  return (
    <Form
      fields={fields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default FormLogin;
