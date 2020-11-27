import React, { useEffect, useState  } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function CategoriaConsulta({role}) {
    let { id } = useParams();
    const [categoria, setCategoria] = useState({});

    let { url } = useRouteMatch();
    
    console.log(categoria);

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get(`/categoria/${id}`)
     
          setCategoria(result.data.data);
        };
     
        fetchData();
    }, [id]);

    return (
        <div className="d-flex h-100">
            <form className="form-signup">
                <div className="mb-8 text-center">
                <h1 className="h3 mb-3 font-weight-normal">Detalhes Categoria</h1>
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

                <a className="btn btn-lg btn-primary btn-block" href="/categoria">VOLTAR</a>

            </form>
            
        </div>
    );
  };

  export default CategoriaConsulta;