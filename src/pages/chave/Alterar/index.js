import React, { useEffect, useState  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function ChaveAlterar() {

    const [chave, setChave] = useState({});
    const [ error, setError] = useState('');

    let { id } = useParams();

    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get(`/chave/${id}`)
     
          setChave(result.data.data);
        };
     
        fetchData();
    }, [id]);

    async function handleCadastro (e){
      e.preventDefault();

      setError('');
      try {

          console.log(chave);
          const res = await backend.put("/chave", { id: chave.id, nomeChave: chave.nomeChave, valorChave: chave.valorChave, ativo: chave.ativo });

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
              <h1 className="h3 mb-3 font-weight-normal">Alterar Chave</h1>
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
                <label htmlFor="inputDescricao" className="sr-only">Data Criação</label>
                <span>Data Criação: <br></br>{new Date(chave.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>

            </div>

            <br></br>

            <br></br>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Alterar</button>
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

  export default ChaveAlterar;