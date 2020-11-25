import React, { Component } from 'react';
import {api} from '../../api';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';

import TabelaIndices from '../../components/TabelaIndices';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
class Home extends Component {

    state = {
      moedas: [],
    }

    async componentDidMount() {
      const response = await api.get('');
      let moedasArray = [];
      for (const moeda in response.data) {
        moedasArray.push(response.data[moeda]);
      }
  
      this.setState({ moedas: moedasArray });
    }
  
    render() {
        const { moedas } = this.state;
        
      return (
        <div>
            <div className="jumbotron">
              <div className="container">
                <h1 className="display-3">Bem vindo!</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                </div>
                <div className="col-md-4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                </div>
                <div className="col-md-4">
                  <h2>Heading</h2>
                  <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                  <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                </div>
              </div>

              <hr></hr>
            </div>
            <div id="cotacoes">
                <h2 className="text-center">Cotações</h2>
                <TabelaIndices indices={moedas} />
            </div>
            
        </div>
        
      );
    };
  };
  
  export default Home;