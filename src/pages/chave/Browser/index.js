import React, { useEffect, useState  } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { backend  } from '../../../api';
import './index.css';


function ChaveBrowser() {
    const [chaves, setChaves] = useState([]);

    let { url } = useRouteMatch();

    useEffect(() => {
        const fetchData = async () => {
          const result = await backend.get('/chave/0/10')
     
          setChaves(result.data.data.content);
        };
     
        fetchData();
    }, []);

    return (
        <div>
            <div className="jumbotron p-4">
                <div className="container">
                <h1 className="display-3 text-center">Chaves</h1>
                </div>
            </div>
            <div className="container">
                <a className="btn btn-success" href={`${url}/novo`}>Adicionar</a>

                <br /><br />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Chave</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Data Criação</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {chaves.map((chave, index) => (
                            <tr key={chave.id}>
                                <th scope="row"></th>
                                <td>{chave.nomeChave}</td>
                                <td>{chave.valorChave}</td>
                                <td>{chave.idCategoria}</td>
                                <td>{new Date(chave.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td><a className="btn btn-primary" href={`${url}/${chave.id}`}>Detalhes</a></td>
                                <td><a className="btn btn-warning" href={`${url}/alterar/${chave.id}`}>Alterar</a></td>
                                <td><a className="btn btn-danger" href={`${url}/excluir/${chave.id}`}>Excluir</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>               
            </div>    
        </div>
    );
  };

  export default ChaveBrowser;