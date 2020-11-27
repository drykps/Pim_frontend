import React, { useContext, useState } from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import { Link    } from "react-router-dom";

import { AuthContext } from '../../contexts/auth';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
 
//para importar o css, venho direto aqui tbm
import './index.css';
 
//stateless components - criamos componentes por meio de variaveis
const Header = () => {
    const {usuario, logout} = useContext(AuthContext);   
    const [dropdown, setDropdown] = useState(false);

    const handleLogout = ()  => {
        logout();
    }

    return(
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">BlockchainStorage</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>  

                <Nav className={usuario.logado ? 'd-none': ''}>
                    <Nav.Link href="/cadastro">CADASTRE-SE</Nav.Link>
                    <Nav.Link eventKey={2} href="/login">
                        ENTRAR
                    </Nav.Link>
                </Nav>
            <form className={!usuario.logado ? 'd-none': 'form-inline my-2 my-lg-0'}    >
                <div className={dropdown ? 'dropdown show' : 'dropdown'}>
                    <span className="user-dropdown" data-letters={usuario.informacoes.iniciais} onClick={()=>{ setDropdown(!dropdown) }}>{usuario.informacoes.nome} &nbsp;&nbsp;</span>
                    <div className={dropdown ? 'dropdown-menu show' : 'dropdown-menu'} onClick={()=>{ setDropdown(false) }} >
                        <h6 className="dropdown-header">Gerenciamento</h6>
                        <Link className="dropdown-item" to="/chave">Chaves</Link>
                        <Link className="dropdown-item" to="/categoria">Categoria</Link>
                        <div className="dropdown-divider"></div>
                        <h6 className="dropdown-header">Usuario</h6>
                        <Link className="dropdown-item" to="/usuario">Perfil</Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item btn btn-warning" type="button" onClick={()=>{ handleLogout()}}>Sair</button>
                    </div>

                </div>
            </form>
        </Navbar.Collapse>
        </Navbar>
    </header>
    )
};

export default Header;