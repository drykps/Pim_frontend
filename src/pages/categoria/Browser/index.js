import React, { useEffect, useState  } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function CategoriaBrowser() {
    const [categorias, setCategorias] = useState([]);

    let { url } = useRouteMatch();

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get('/categoria/0/10')
     
          setCategorias(result.data.data.content);
        };
     
        fetchData();
    }, []);

    return (
        <div>
            <div className="jumbotron p-4">
                <div className="container">
                <h1 className="display-3 text-center">Categorias</h1>
                </div>
            </div>
            <div className="container">
                <a className="btn btn-success" href={`${url}/novo`}>Adicionar</a>

                <br /><br />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Data Criação</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria, index) => (
                            <tr key={categoria.id}>
                                <th scope="row"></th>
                                <td>{categoria.nome}</td>
                                <td>{categoria.descricao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{categoria.ativo}</td>
                                <td>{new Date(categoria.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td><a className="btn btn-primary" href={`${url}/${categoria.id}`}>Detalhes</a></td>
                                <td><a className="btn btn-warning" href={`${url}/alterar/${categoria.id}`}>Alterar</a></td>
                                <td><a className="btn btn-danger" href={`${url}/excluir/${categoria.id}`}>Excluir</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>               
            </div>    
        </div>
    );
  };

  export default CategoriaBrowser;