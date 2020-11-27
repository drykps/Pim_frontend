import React, { useEffect, useState  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function CategoriaAlterar() {

    const [categoria, setCategoria] = useState({});
    const [ error, setError] = useState('');

    let { id } = useParams();

    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get(`/categoria/${id}`)
     
          setCategoria(result.data.data);
        };
     
        fetchData();
    }, [id]);

    async function handleCadastro (e){
      e.preventDefault();

      setError('');
      try {

          console.log(categoria);
          const res = await backend.put("/categoria", { id: categoria.id, nome: categoria.nome, descricao: categoria.descricao, ativo: categoria.ativo });

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
              <h1 className="h3 mb-3 font-weight-normal">Alterar Categoria</h1>
            </div>

            <div className="form-group row">
                <label htmlFor="inputNome" className="sr-only">Nome</label>
                <input type="text" onChange={(event) => {  setCategoria( prev => ({ ...prev, nome: event.target.value})); }} value={categoria.nome} id="inputNome" name="nome" className="form-control" placeholder="Nome" required autoFocus></input>
            </div>

            <div className="form-group row">
              <label htmlFor="inputDescricao" className="sr-only">Descrição</label>
              <textarea onChange={(event) => { setCategoria( prev => ({ ...prev, descricao: event.target.value})); }}  value={categoria.descricao} id="inputDescricao" name="descricao" className="form-control" placeholder="Descricao" required ></textarea>

            </div>

            <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Data Criação</label>
                <span>Data Criação: <br></br>{new Date(categoria.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>

            </div>

            <div className="form-group row">
                <span>Ativo:</span> 
            </div>

            <div className="form-group row">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class={`btn btn-secondary ${categoria.ativo ? 'active' : ''}`}>
                        <input type="radio" name="ativo" id="ativo-sim" autocomplete="off" onClick={()=> {  setCategoria( prev => ({ ...prev, ativo: true})); }} checked={categoria.ativo}></input> Sim
                    </label>
                    <label class={`btn btn-secondary ${!categoria.ativo ? 'active' : ''}`}>
                        <input type="radio" name="ativo" id="ativo-nao" autocomplete="off" onClick={()=> {  setCategoria( prev => ({ ...prev, ativo: false})); }} checked={!categoria.ativo}></input> Não
                    </label>
                </div>
            </div>

            <br></br>

            <br></br>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Alterar</button>
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

  export default CategoriaAlterar;