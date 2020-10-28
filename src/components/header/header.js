import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
 
//para importar o css, venho direto aqui tbm
import './header.css';
 
//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const Header = () => (
    <header>
        <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Serviços</Nav.Link>
       
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Buscar</Button>
        </Form>
    </Navbar.Collapse>
    </Navbar>
</header>
);

export default Header;