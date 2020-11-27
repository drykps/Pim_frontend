import React, { useContext, useState } from 'react';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';

import { AuthContext } from '../../contexts/auth';

import { Redirect, withRouter } from 'react-router-dom';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
function Login() {
  const {usuario, login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    if (email && password) {

      if(password.length < 6 ){
        setError("A senha possui no minimo 6 caracteres.");
      }

      try {
        login(email, password);
      } catch (err) {
        console.log(err); 
        setError("Ocorreu um erro ao loga-se sua conta.");
      }
    } else {
      setError("Preencha todos os dados para se cadastrar");
    }
  };
  

  if(usuario.logado){
    return <Redirect to="/" />;
  }
  
  return (
      <div className='d-flex h-100'>
          <form className="form-signin"  onSubmit={handleLogin}>
            <div className="mb-4 text-center">
              <img className="mb-4" src="/images/safe.svg" alt="logo vault  " width="72" height="72"></img>
              <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <label htmlFor="inputEmail" className="sr-only">Email</label>
            <input type="email" onChange={(event) => { setEmail(event.target.value); }} id="inputEmail" name="email" className="form-control" placeholder="Email" required autoFocus></input>
            <label htmlFor="inputPassword" className="sr-only">Senha</label>
            <input type="password" onChange={(event) => { setPassword(event.target.value); }} id="inputPassword" name="password" className="form-control" placeholder="Senha" required></input>
          
            <button className="btn btn-lg btn-primary btn-block" type="submit">Logar</button>

            <br></br>

            <div className={  !error ?  'd-none' : 'alert alert-danger' } role="alert">
              {error}
            </div>
          </form>
      </div>
      );
  };
  
  export default withRouter(Login);