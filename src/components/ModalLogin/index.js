import React from "react";
import * as yup from "yup";
import { connect } from "react-redux";
import { MdPersonAdd } from "react-icons/md";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { HANDLE_LOGIN } from "../../store/actions/user";
import { Logar } from "../../services/login";

import Modal from "../Modal";
import Button from "../Button";

import "./styles.css";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("O email deve ser valido")
    .required("O email não deve ser vazio"),
  senha: yup
    .string()
    .min(8, "A senha deve ter mais de 8 caracteris")
    .required("A senha não deve ser vazia"),
});

const ModalLogin = ({ handleLogin }) => {
  const handleSubmit = async (values) => {
    const { email, senha } = values;
    const data = await Logar(email, senha);

    const user = {
      ...data,
      tipo: data.tipoUsuario,
      url: data.urlFoto,
    };

    delete user.urlFoto;
    delete user.tipoUsuario;

    if (user.tipo === "VENDEDOR") {
      user.comercio = { ...data.comercio };
    }

    delete user.tipo;

    const date = data.dataNascimento;
    handleLogin({
      ...user,
      dataNascimento: `${date.split("-")[2]}/${date.split("-")[1]}/${
        date.split("-")[0]
      }`,
    });
  };

  return (
    <Modal tipo="login" id="modal1">
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="form-modal-login">
          <div className="titulo">
            <h1>ENTRAR</h1>
          </div>
          <div className="input-field">
            <label>Email</label>
            <Field name="email" placeholder="Digite seu email" type="text" />
            <ErrorMessage
              className="helper-text"
              component="span"
              name="email"
            />
          </div>
          <div className="input-field">
            <label>Senha</label>
            <Field
              name="senha"
              placeholder="Digite sua senha"
              type="password"
            />
            <ErrorMessage
              className="helper-text"
              component="span"
              name="senha"
            />
          </div>

          <div className="containerBtnLogin">
            <div className="modal-close btnLogin">
              <Button
                text="CRIAR CONTA"
                tooltip="Criar uma nova conta"
                position="bottom"
                Icon={MdPersonAdd}
                tipo="Link"
                to="/cadastro"
                typeButton="secundaria"
              />
            </div>
            <div className="modal-close btnLogin">
              <Button
                position="bottom"
                tooltip="Entrar na minha conta"
                type="submit"
                submit="submit"
              />
            </div>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (user) => dispatch(HANDLE_LOGIN(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);
