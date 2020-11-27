import React, { useEffect, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function ChaveIncluir() {

    const [chave, setChave] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [ error, setError] = useState('');
    
    let history = useHistory();

    useEffect(() => {
      const fetchData = async () => {
        const result = await backend.get('/categoria/0/10')
   
        setCategorias(result.data.data.content);
      };
   
      fetchData();
    }, []);
 

  async function handleCadastro (e){
        e.preventDefault();

        setError('');
        try {

          if(chave.idCategoria &&  chave.nomeChave && chave.valorChave ){
            console.log(chave);
            const res = await backend.post("/chave", { nomeChave: chave.nomeChave, valorChave: chave.valorChave,  idCategoria: chave.idCategoria });
  
            history.replace(`/chave/${res.data.data.id}`);
            
          }

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
              <textarea onChange={(event) => { setChave( prev => ({ ...prev, valorChave: event.target.value})); }}  value={chave.valorChave} id="inputDescricao" name="valorChave" className="form-control" placeholder="Valor Chave" required ></textarea>

            </div>

            <div className="form-group row">
              <label htmlFor="inputDescricao" className="sr-only">CATEGORIA</label>
              <select onChange={(event) => { setChave( prev => ({ ...prev, idCategoria: event.target.value})); }}  value={chave.idCategoria} id="categoria" name="categoria" className="form-control" required >
                <option selected >SELECIONE UMA CATEGORIA</option>
                {categorias.map( (categoria)  => (<option value={categoria.id} >{categoria.nome}</option>)  )}
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