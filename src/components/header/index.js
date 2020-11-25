import React from 'react';

import { Navbar, Nav, Form} from 'react-bootstrap';

import { Link, Redirect  } from "react-router-dom";
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
 
//para importar o css, venho direto aqui tbm
import './index.css';
 
//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const usuarioLogado = () =>{
    if(isUsuarioLogado()){
        return JSON.parse(localStorage.getItem('user'));
    }
    return {};
};

const isUsuarioLogado = () =>{
    const token = localStorage.getItem('token');
    console.log(token);
    return !!token;
}

const deslogarUsuario = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("teste");
    return <Redirect to="/"  />
}


const Header = () => (
    <header>
        <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand href="/">BlockchainStorage</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Link to="/">Home</Link> &nbsp;&nbsp;
            <Link to="/chave">Gerenciamento</Link> &nbsp;&nbsp;
            <Link to="/categoria">Categoria</Link> &nbsp;&nbsp;
        </Nav>
        <div className={isUsuarioLogado() ? 'd-none': ''}>
            <Form inline>
                <Link to="/cadastro">CADASTRE-SE</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/login">ENTRAR</Link>
            </Form>
        </div>
        <div className={!isUsuarioLogado() ? 'd-none': ''}>
            <span>{usuarioLogado().email}</span>
            <Link to="/usuario">Usuário</Link>&nbsp;&nbsp;
            <button type="button" class="btn btn-warning" onClick={()=>{ deslogarUsuario()}}>Sair</button>
        </div>
    </Navbar.Collapse>
    </Navbar>
</header>
);

export default Header;