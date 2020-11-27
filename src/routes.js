import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


import Home from './pages/Home';
import DetalhesUsuario from './pages/usuario/detalhes';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import CategoriaBrowser from './pages/Categoria/Browser';
import CategoriaIncluir from './pages/Categoria/Incluir';
import CategoriaConsultar from './pages/Categoria/Consulta';
import CategoriaExcluir from './pages/Categoria/Excluir';
import CategoriaAlterar from './pages/Categoria/Alterar';
import ChaveBrowser from './pages/Chave/Browser';
import ChaveIncluir from './pages/Chave/Incluir';
import ChaveConsultar from './pages/Chave/Consulta';
import ChaveExcluir from './pages/Chave/Excluir';
import ChaveAlterar from './pages/Chave/Alterar';

import {AuthContext} from './contexts/auth' ;
import Loading from './components/Loading';

// && ( user.informacoes.tipoUsuario === 'ROLE_ADMIN' ||  role === user.informacoes.tipoUsuario )
function PrivateRoute ({component: Component, user, role, ...rest}) {
    console.log({user, role});
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
