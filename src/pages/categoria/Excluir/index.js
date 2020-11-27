import React, { useEffect, useState  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function CategoriaExcluir() {
    let { id } = useParams();
    const [categoria, setCategoria] = useState({});

    let history = useHistory();
    
    console.log(categoria);

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get(`/categoria/${id}`)
     
          setCategoria(result.data.data);
        };
     
        fetchData();
    }, [id]);

    async function  handleDelete(e) {
        e.preventDefault();

        try {
            await backend.delete(`/categoria/${id}`);

            history.replace(`/categoria`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex h-100">
            <form className="form-signup" onSubmit={handleDelete}>
                <div className="mb-8 text-center">
                <h1 className="h3 mb-3 font-weight-normal">Exclusão de Categoria</h1>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputNome" className="sr-only">Nome</label>
                    <span>Nome: <br></br>{categoria.nome}</span>
                </div>

                <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Descrição</label>
                <span>Descricao: <br></br>{categoria.descricao}</span>

                </div>

                <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Data Criação</label>
                <span>Data Criação: <br></br>{new Date(categoria.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>

                </div>

                <div className="form-group row">
                <label htmlFor="inputDescricao" className="sr-only">Ativo</label>
                <span>Ativo: <br></br>{categoria.ativo ? 'Sim' : 'Não'}</span>

                </div>

                <br></br>

                <br></br>
                <a className="btn btn-lg btn-primary btn-block" href="/categoria">Cancelar</a>
                <button type="submit" className="btn btn-lg btn-danger btn-block" >Excluir</button>

            </form>
            
        </div>
    );
  };

  export default CategoriaExcluir;