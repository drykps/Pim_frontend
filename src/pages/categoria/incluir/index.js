import React, { useState  } from 'react';
import { useHistory } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function CategoriaIncluir() {

    const [categoria, setCategoria] = useState({});
    const [ error, setError] = useState('');
    
    let history = useHistory();

    async function handleCadastro (e){
        e.preventDefault();

        setError('');
        try {

            console.log(categoria);
            const res = await backend.post("/categoria", { nome: categoria.nome, descricao: categoria.descricao });

            history.replace(`/categoria/${res.data.data.id}`);
          } catch (err) {
            console.log(err);
            setError("Ocorreu um erro ao cadastrar sua conta.");
        }
    }

    return (
        <div className="d-flex h-100">
          <form className="form-signup"  onSubmit={handleCadastro}>
            <div className="mb-8 text-center">
              <h1 className="h3 mb-3 font-weight-normal">Nova Categoria</h1>
            </div>

            <div className="form-group row">
                <label htmlFor="inputNome" className="sr-only">Nome</label>
                <input type="text" onChange={(event) => {  setCategoria( prev => ({ ...prev, nome: event.target.value})); }} value={categoria.nome} id="inputNome" name="nome" className="form-control" placeholder="Nome" required autoFocus></input>
            </div>

            <div className="form-group row">
              <label htmlFor="inputDescricao" className="sr-only">Descrição</label>
              <textarea onChange={(event) => { setCategoria( prev => ({ ...prev, descricao: event.target.value})); }}  value={categoria.descricao} id="inputDescricao" name="descricao" className="form-control" placeholder="Descricao" required ></textarea>

            </div>

            <br></br>

            <br></br>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
            <br></br>
            <a className="btn btn-lg btn-primary btn-block" href="/categoria">VOLTAR</a>
            
            <br></br>

            <div className={  !error ?  'd-none' : 'alert alert-danger' } role="alert">
              {error}
            </div>
          </form>
        </div>
    );
  };

  export default CategoriaIncluir;