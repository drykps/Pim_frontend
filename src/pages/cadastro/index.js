import React, { useContext, useState } from 'react';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';

import { backend } from '../../api'

import { AuthContext } from '../../contexts/auth';

import { Redirect, withRouter,  useLocation  } from 'react-router-dom';
import { validarCNPJ, validarCpf } from '../../utils/utils';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Cadastro() {
  const query = useQuery();

  const queryTipoPessoa = ( query.get("tipo") && ( parseInt(query.get("tipo")) === 'ROLE_CLIENTEPF' ? 'ROLE_CLIENTEPF' : 'ROLE_CLIENTEPJ' ) ) || 'ROLE_CLIENTEPF';
  const {logado} = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [coPassword, setCoPassword] = useState('');
  const [tipoUsuario, setTipoPessoa] = useState(queryTipoPessoa);
  const [documento, setDocumento] = useState('');

  const [ error, setError] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

  const handleCadastro = async e => {
    e.preventDefault();

    setError('');

    if ( !nome || !email || !senha || !coPassword || !documento) {
      setError("Todos os campos são obrigatorios.");
      return;
    }

    if(senha.length < 6 ){
      setError("A senha deve possuir no minimo 6 caracteres.");
      return;
    }

    if ( tipoUsuario  === 'ROLE_CLIENTEPF'  && !validarCpf(documento) ) {      
      setError("Digite um CPF valido!");
      return;
    }

    if ( tipoUsuario  === 'ROLE_CLIENTEPJ'  && !validarCNPJ(documento) ) {      
      setError("Digite um CNPJ valido!");
      return;
    }

    try {
      setLoadingButton(true);
      const res = await backend.post("/usuario", { nome, email,   senha, tipoUsuario, documento });

      if(res.data.errors && res.data.errors.length > 0){
        setError(res.data.errors[0]);
        setLoadingButton(false);
      }else{
        alert('Usuario cadastrado com sucesso.');
        return <Redirect to="/" />;
      }

    } catch (err) {
      console.log(err);
      setLoadingButton(false);
      setError("Ocorreu um erro ao cadastrar sua conta.");
    }

  };
  
  return (
        <div className="d-flex h-100">
          <form className="form-signup"  onSubmit={handleCadastro}>
            <div className="mb-8 text-center">
              <img className="mb-4" src={`/images/ic-pessoa-${tipoUsuario === 'ROLE_CLIENTEPF' ? 'fisica' : 'juridica'}.png`} alt="icone  tipo pessoa" width="72" height="72"></img>
              <h1 className="h3 mb-3 font-weight-normal">Cadastro {  tipoUsuario === 'ROLE_CLIENTEPF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</h1>
            </div>

            <div className="form-group row">
                <label for="inputNome" className="sr-only">Nome</label>
                <input type="text" onChange={(event) => { setNome(event.target.value); }} id="inputNome" name="nome" className="form-control" placeholder="Nome" required autoFocus></input>
            </div>

            <div className="form-group row">
              <label for="inputEmail" className="sr-only">Email</label>
              <input type="email" onChange={(event) => { setEmail(event.target.value); }} id="inputEmail" name="email" className="form-control" placeholder="Email" required></input>

            </div>

            <div className="form-group row">
              <label for="inputPassword" className="sr-only">Senha</label>
              <input type="password" onChange={(event) => { setSenha(event.target.value); }} id="inputPassword" name="password" className="form-control" placeholder="Senha" required></input>

            </div>

            <div className="form-group row">
              <label for="inpuCoPassword" className="sr-only">Confirmação Senha</label>
              <input type="password" onChange={(event) => { setCoPassword(event.target.value); }} id="inpuCoPassword" name="coPassword" className="form-control" placeholder="Confirmação Senha" required></input>

            </div>

            <div className={ tipoUsuario  === 'ROLE_CLIENTEPF' ? "form-group row"  : 'd-none'}>
              <label for="inpuCoPassword" className="sr-only">CPF</label>
              <input type="text" onChange={(event) => { setDocumento(event.target.value); }}  pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title="Digite um CPF" id="inpuCpf" name="cpf" className="form-control" placeholder="CPF"></input>

            </div>

            <div className={ tipoUsuario  === 'ROLE_CLIENTEPJ' ? "form-group row" : 'd-none'}>
              <label for="inpuCoPassword" className="sr-only">CNPJ</label>
              <input type="text" onChange={(event) => { setDocumento(event.target.value); }}  pattern="(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})" title="Digite um CNPJ" id="inputCNPJ" name="cnpj" className="form-control" placeholder="CNPJ"></input>

            </div>
            
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPessoa" id="ipt-ck-fisica" onClick={()=> { setTipoPessoa('ROLE_CLIENTEPF'); setDocumento('')  }} value="ROLE_CLIENTEPF" checked={tipoUsuario === 'ROLE_CLIENTEPF'}></input>
              <label className="form-check-label" for="ipt-ck-fisica">
                Pessoa Fisica
              </label>

            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPessoa" id="ipt-ck-juridica" onClick={()=> { setTipoPessoa('ROLE_CLIENTEPJ'); setDocumento('')  }} value="ROLE_CLIENTEPJ" checked={tipoUsuario === 'ROLE_CLIENTEPJ'}></input>
              <label className="form-check-label" for="ipt-ck-juridica">
                Pessoa Juridica
              </label>

            </div>

            <br></br>

            <br></br>

            <button className={`btn btn-lg btn-primary btn-block ${!loadingButton ?  '' : 'd-none'}`} type="submit">Cadastrar</button>
            
            <button className={`btn btn-lg btn-primary btn-block ${loadingButton ? '' :'d-none'}`} type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>

            <br></br>

            <div className={  !error ?  'd-none' : 'alert alert-danger' } role="alert">
              {error}
            </div>
          </form>
        </div>
      );
  };
  
  export default withRouter(Cadastro);