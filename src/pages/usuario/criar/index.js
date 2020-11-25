import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import {backend} from '../../../api';
import { Redirect } from 'react-router-dom';
import './index.css';
 
class CriarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: {
                email: "",
                senha: "",
                ativo: true
            },
            erro: null,
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
            return (
                <form className="form-horizontal center" action='' method="POST">
                    <fieldset>
                        <div id="legend">
                        <legend className="">Registre-se</legend>
                        </div>
                        <div className="control-group">
                        <label className="control-label" for="email">E-mail</label>
                        <div className="controls">
                        <input type="email" onChange={this.handleInputChange} value={this.state.user.email} id="inputEmail" name="email" className="form-control" placeholder="Email" required autofocus></input>
                        </div>
                        </div>
                    
                        <div className="control-group">
                        <label className="control-label" for="password">Password</label>
                        <div className="controls">
                        <input type="password" onChange={this.handleInputChange} value={this.state.user.password} id="inputPassword" name="password" className="form-control" placeholder="Senha" required></input>
                        </div>
                        </div>
                    
                        <div className="control-group">
                        <label className="control-label"  for="password_confirm">Password (Confirm)</label>
                        <div className="controls">
                            <input type="password" id="password_confirm" name="password_confirm" placeholder="" className="input-xlarge"></input>
                            <p className="help-block">Please confirm password</p>
                        </div>
                        </div>
                    
                        <div className="control-group">
                        <div className="controls">
                            <button className="btn btn-success">Register</button>
                        </div>
                        </div>
                    </fieldset>
                    </form>
            );
        
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = (e) => {
        if(this.state.user && this.state.user.email && this.state.user.password){
            backend.post('/usuario', this.state.user).then( (res)=>{
              if(res.status === 200){
                alert('Cadastro realizado com sucesso!');
                return <Redirect to="/login" />;
              }else{
                alert('Existe algo errado nas credenciais.');
              }
            });
          }else{
            alert('Existe algo errado nas credenciais.');
          }
    }
    
}
 
export default CriarUsuario;
