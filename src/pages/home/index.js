import React, { useEffect, useState } from 'react';
import {api} from '../../api';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';

import Indices from '../../components/Indices';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
function  Home() {
    const [indices, setIndices] = useState(null);

    useEffect(() => {
      async function  buscarDadosIndices(){
        const response = await api.get('');
        let moedasArray = [];
        
        for (const moeda in response.data) {
          moedasArray.push(response.data[moeda]);
        }
        setIndices(moedasArray);
      }

      buscarDadosIndices();
      
    }, []);
  
    
  
    return (
      <div>
          <div className="jumbotron p-4">
            <div className="container">
              <h1 className="display-3">Bem vindo!</h1>
              <p>Gerenciamento de chaves blockchain, em diversos dispositivos 24 horas por dia, e com custo-zero*</p>
            </div>
          </div>
          <div className="container">
            <h2 className="text-center">Nossos planos </h2>
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Pessoa física</h5>
                  <p className="card-text">Desfrute do armazenamento seguro de suas chaves de blockchain sem-custos*.</p>
                  <p><a className="btn btn-secondary" href="/cadastro?tipo=1" role="button">Comece agora »</a></p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Pessoa juridica</h5>
                  <p className="card-text">Desfrute do armazenamento seguro de suas chaves de blockchain com os menores custos*</p>
                  <p><a className="btn btn-secondary" href="/cadastro?tipo=2" role="button">Comece agora »</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div id="cotacoes"  >
                <h2 className="text-center">Cotações</h2>
                <Indices indices={indices} />
            </div>
          </div>
      </div>
    );
  };
  
  export default Home;