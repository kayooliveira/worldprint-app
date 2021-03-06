import React, { useEffect, useState } from "react";

import Form from "./Form";

import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [fields, setFields] = useState({ email: "", password: "", name: "" });

  const { token, setToken } = useAuth();

  const navigate = useNavigate();

  // REDIRECIONA O USUÁRIO CASO ELE JÁ TENHA UM TOKEN SALVO

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleChange = (input) => {
    setFields({ ...fields, [input.target.name]: input.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.get("/sanctum/csrf-cookie").then((response) =>
      api.post("/register", fields).then((response) => {
        if (response.status === 200 && response.data.token) {
          setToken(JSON.stringify(response.data.token));
        }
      })
    );
  };

  return (
    <Form
      fields={fields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
