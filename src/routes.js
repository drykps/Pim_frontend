import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';


import Home from './pages/main';
import Chaves from './pages/chave';
import DetalhesUsuario from './pages/usuario/detalhes';
import CriarUsuario from './pages/usuario/criar';
import Login from './pages/login';
import Categoria from './pages/categoria';
 



function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
        {...rest}
        render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

const Routes = () => {
    let isUsuarioLogado = false;

    const token = localStorage.getItem('token');
    if(token){
        const usuario = localStorage.getItem('user');
        console.log(token);
        isUsuarioLogado = true;
    }
    
    return (
    <BrowserRouter>
        <Header />
        <div>
            <Switch>
                <Route exact path="/"><Home></Home></Route>
                <PrivateRoute authed={isUsuarioLogado} path='/chave' component={Chaves} />
                <PrivateRoute authed={isUsuarioLogado} path='/usuario' component={DetalhesUsuario} />
                <Route exact path="/cadastro" component={CriarUsuario} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/categoria" component={Categoria} />
            </Switch>
        </div>
        <Footer></Footer>
    </BrowserRouter>
)
    }
 
export default Routes;
