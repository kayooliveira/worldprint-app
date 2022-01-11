import React from "react";

import styles from "./Form.module.css";

import logo from "../../../../assets/img/logo.png";

import * as B from "react-bootstrap";
import { Link } from "react-router-dom";

const Form = ({ handleChange, fields, handleSubmit }) => {
  return (
    <B.Container className={styles.FormLogin + " d-flex vh-100"}>
      <B.Form className="m-auto align-self-center">
        <div className={styles.formContent}>
          <img src={logo} width="100px" alt="logo" />
          <hr />
          <h1 className={styles.formTitle}>WORLDPRINT | CADASTRO</h1>

          <B.FormGroup className="mb-3" controlId="formEmail">
            <B.FormLabel>Nome</B.FormLabel>
            <B.FormControl
              onChange={handleChange}
              type="name"
              name="name"
              value={fields.name}
              placeholder="Digite o seu nome"
            />
            <span className="error">
              {/* {hasValidation() && errors.name && errors.name} */}
            </span>
          </B.FormGroup>

          <B.FormGroup className="mb-3" controlId="formEmail">
            <B.FormLabel>Email/Usuário</B.FormLabel>
            <B.FormControl
              onChange={handleChange}
              type="email"
              name="email"
              value={fields.email}
              placeholder="Digite o email"
            />
            <B.FormText className="text-mute">
              Nós nunca compartilhamos seus dados pessoais com ninguém além dos
              nossos servidores
            </B.FormText>
            <span className="error">
              {/* {hasValidation() && errors.email && errors.email} */}
            </span>
          </B.FormGroup>

          <B.FormGroup className="mb-3" controlId="formEmail">
            <B.FormLabel>Senha</B.FormLabel>
            <B.FormControl
              onChange={handleChange}
              type="password"
              name="password"
              value={fields.password}
              placeholder="Digite a sua senha"
            />
            <span className="error">
              {/* {hasValidation() && errors.password && errors.password} */}
            </span>
          </B.FormGroup>
          <B.Button
            type="submit"
            className="btn btn-success w-50"
            onClick={handleSubmit}
          >
            REGISTER
          </B.Button>
          <br />
          <span>
            Já tem uma conta? <Link to="/login">Entre</Link>
          </span>
        </div>
      </B.Form>
    </B.Container>
  );
};

export default Form;
