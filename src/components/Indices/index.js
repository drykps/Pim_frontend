import React from 'react';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';
 


//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const TabelaIndices = ({indices}) => {
    const site = {
      'USD-BRL' :  'https://economia.uol.com.br/cotacoes/cambio/dolar-comercial-estados-unidos/',
      'EUR-BRL' :  'https://economia.uol.com.br/cotacoes/cambio/euro-uniao-europeia/',
      'BTC-BRL' :  'https://www.infomoney.com.br/cotacoes/bitcoin-btc/'
    }


    if(!indices){
        return (
          <div className="d-flex justify-content-center p-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
    }


    return (
      <div className="card-deck">
          { indices.map(indice => (
                <div key={indice.code + indice.codein} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{indice.name}</h5>

                    <p className="card-text">Variação: {indice.pctChange}%</p>
                    <p className="card-text">Valor atual: {indice.ask}</p>
                    <p className="card-text">Maxima: {indice.high}</p>
                    <p className="card-text">Minima: {indice.low}</p>
                    <p><a className="btn btn-secondary" href={ site[indice.code + '-' + indice.codein ]} target="_blank" rel="noreferrer" role="button">Detallhes »</a></p>
                  </div>
                </div>
            ))}
        </div>
    );
};

export default TabelaIndices;