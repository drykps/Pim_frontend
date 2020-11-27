import React, { useEffect, useState  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function ChaveExcluir() {
    let { id } = useParams();
    const [chave, setChave] = useState({});

    let history = useHistory();
    
    console.log(chave);

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get(`/chave/${id}`)
     
          setChave(result.data.data);
        };
     
        fetchData();
    }, [id]);

    async function  handleDelete(e) {
        e.preventDefault();

        try {
            const res = await backend.delete(`/chave/${id}`);

            history.replace(`/chave`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex h-100">
            <form className="form-signup" onSubmit={handleDelete}>
                <div className="mb-8 text-center">
                <h1 className="h3 mb-3 font-weight-normal">Exclusão de Chave</h1>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputNome" className="sr-only">Nome</label>
                    <span>Nome: <br></br>{chave.nomeChave}</span>
                </div>

                <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Descrição</label>
                <span>Chave: <br></br>{chave.valorChave}</span>

                </div>

                <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Data Criação</label>
                <span>Data Criação: <br></br>{new Date(chave.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>

                </div>

                <br></br>

                <br></br>
                <a className="btn btn-lg btn-primary btn-block" href="/chave">Cancelar</a>
                <button type="submit" className="btn btn-lg btn-danger btn-block" >Excluir</button>

            </form>
            
        </div>
    );
  };

  export default ChaveExcluir;