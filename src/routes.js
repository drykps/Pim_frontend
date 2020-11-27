import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';


import Home from './pages/home';
import DetalhesUsuario from './pages/usuario/detalhes';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import CategoriaBrowser from './pages/categoria/browser';
import CategoriaIncluir from './pages/categoria/incluir';
import CategoriaConsultar from './pages/categoria/consulta';
import CategoriaExcluir from './pages/categoria/excluir';
import CategoriaAlterar from './pages/categoria/alterar';
import ChaveBrowser from './pages/chave/browser';
import ChaveIncluir from './pages/chave/incluir';
import ChaveConsultar from './pages/chave/consulta';
import ChaveExcluir from './pages/chave/excluir';
import ChaveAlterar from './pages/chave/alterar';

import {AuthContext} from './contexts/auth' ;
import Loading from './components/loading';

// && ( user.informacoes.tipoUsuario === 'ROLE_ADMIN' ||  role === user.informacoes.tipoUsuario )
function PrivateRoute ({component: Component, user, role, ...rest}) {
    return (
        <Route
        {...rest}
        render={(props) => user.logado === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

const Routes = () => {
    const {usuario, loading} = useContext(AuthContext);

    if (loading) {
        return (
          <Loading></Loading>
        );
    }

    return (
        <BrowserRouter>
                <Header />
                <div className="conteudo-principal">
                        <Switch>
                            <Route exact path="/"><Home></Home></Route>
                            <PrivateRoute user={usuario} path='/usuario' component={DetalhesUsuario} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" exact path='/categoria' component={CategoriaBrowser} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/categoria/novo' component={CategoriaIncluir} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/categoria/alterar/:id' component={CategoriaAlterar} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/categoria/excluir/:id' component={CategoriaExcluir} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/categoria/:id' component={CategoriaConsultar} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" exact path='/chave' component={ChaveBrowser} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/chave/novo' component={ChaveIncluir} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/chave/alterar/:id' component={ChaveAlterar} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/chave/excluir/:id' component={ChaveExcluir} />
                            <PrivateRoute user={usuario} role="ROLE_ADMIN" path='/chave/:id' component={ChaveConsultar} />
                            <Route exact path="/cadastro" component={Cadastro} />
                            <Route exact path="/login" component={Login} />
                        </Switch>
                </div>
                <Footer></Footer>
            </BrowserRouter>
)
    }
 
export default Routes;
