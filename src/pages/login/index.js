import React, { Component } from 'react';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';

import { backend }  from '../../api';
import { Redirect } from 'react-router-dom';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user : {
        email: '',
        password: ''
      }
    }

  }

  efetuarLogin = (e) => {
    console.log(this.state);
    if(this.state.user && this.state.user.email && this.state.user.password){
      backend.post('/api/auth', this.state.user).then( (res)=>{
        if(res.status === 200){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.usuario));
          
          return <Redirect to="/chave" />;
        }else{
          alert('Existe algo errado nas credenciais.');
        }
      });
    }else{
      alert('Existe algo errado nas credenciais.');
    }
  }


  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
        user: { ...prevState.user, [name]: value }
    }));
    console.log(this.state.user);
  };

    render() {
      const token = localStorage.getItem('token');
      if(token){
        return <Redirect to="/chave" />;
      }
      return (
          <form className="form-signin">
            <div className="mb-4 text-center">
              <img className="mb-4" src="/images/safe.svg" alt="logo vault  " width="72" height="72"></img>
              <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <label for="inputEmail" className="sr-only">Email</label>
            <input type="email" onChange={this.handleInputChange} value={this.state.user.email} id="inputEmail" name="email" className="form-control" placeholder="Email" required autofocus></input>
            <label for="inputPassword" className="sr-only">Senha</label>
            <input type="password" onChange={this.handleInputChange} value={this.state.user.password} id="inputPassword" name="password" className="form-control" placeholder="Senha" required></input>
            {/* <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"></input> Lembrar-me
              </label>
            </div> */}
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.efetuarLogin}>Logar</button>
          </form>
      );
    };
  };
  
  export default Login;