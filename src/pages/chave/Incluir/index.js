import React, { useEffect, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function ChaveIncluir() {

    const [chave, setChave] = useState({});
    const [categorias, setCategorias] = useState({});
    const [ error, setError] = useState('');
    
    let history = useHistory();

    async function handleCadastro (e){
        e.preventDefault();

        setError('');
        try {

            console.log(chave);
            const res = await backend.post("/chave", { nomeChave: chave.nomeChave, valorChave: chave.valorChave });

            history.replace(`/chave/${res.data.data.id}`);
          } catch (err) {
            console.log(err);
            setError("Ocorreu um erro ao cadastrar sua conta.");
        }
    }

    return (
        <div className="d-flex h-100">
          <form className="form-signup"  onSubmit={handleCadastro}>
            <div className="mb-8 text-center">
              <h1 className="h3 mb-3 font-weight-normal">Nova Chave</h1>
            </div>

            <div className="form-group row">
                <label htmlFor="inputNome" className="sr-only">Nome</label>
                <input type="text" onChange={(event) => {  setChave( prev => ({ ...prev, nomeChave: event.target.value})); }} value={chave.nomeChave} id="inputNome" name="nomeChave" className="form-control" placeholder="Nome" required autoFocus></input>
            </div>

            <div className="form-group row">
              <label htmlFor="inputDescricao" className="sr-only">Descrição</label>
              <textarea onChange={(event) => { setChave( prev => ({ ...prev, valorChave: event.target.value})); }}  value={chave.valorChave} id="inputDescricao" name="valorChave" className="form-control" placeholder="Descricao" required ></textarea>

            </div>

            <div className="form-group row">
              <label htmlFor="inputDescricao" className="sr-only">CATEGORIA</label>
              <select onChange={(event) => { setChave( prev => ({ ...prev, valorChave: event.target.value})); }}  value={chave.valorChave} id="inputDescricao" name="valorChave" className="form-control" placeholder="Descricao" required >
                  {categorias}
              </select>

            </div>

            <br></br>

            <br></br>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
            <br></br>
            <a className="btn btn-lg btn-primary btn-block" href="/chave">VOLTAR</a>
            
            <br></br>

            <div className={  !error ?  'd-none' : 'alert alert-danger' } role="alert">
              {error}
            </div>
          </form>
        </div>
    );
  };

  export default ChaveIncluir;