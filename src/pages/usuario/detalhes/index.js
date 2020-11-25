import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {backend} from '../../../api';
import './index.css';
 
export default class Usuario extends Component {
    state = {
        usuario: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${backend}/usuario/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario } = this.state;
 
        // if (usuario.ativo) {
        //     usuario.ativo = "Usuário Ativo";
        // } else {
        //     usuario.ativo = "Usuário Inativo";
        // }
 
        return (
            <div className="usuario-info">
                <h1> {usuario.nome} </h1>
                <h1> {usuario.cpf} </h1>
                <h1> {usuario.cnpj} </h1>
                <h1> {usuario.razaoSocial} </h1>
                <h1> {usuario.telefoneCelular} </h1>
                <h1> {usuario.telefone} </h1>
                <h1> {usuario.dataNascimento} </h1>
                <br />
                <Link to={`/usuarios`}> Voltar </Link> <br />
                <Link to={`/editarUsuario/${usuario.id}`}> Editar </Link> <br />
                <Link to={`/deletarUsuario/${usuario.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
