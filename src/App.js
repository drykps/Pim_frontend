import React, { Component } from 'react';
import Header from '../src/components/header/header';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col } from 'react-bootstrap';
 
class App extends Component {

  state = {
    moedas: [],
  }
  async componentDidMount() {
    const response = await api.get('');
    let moedasArray = [];
    for (const moeda in response.data) {
      moedasArray.push(response.data[moeda]);
    }
    console.log(moedasArray);
    console.log('PASSOUs');

    this.setState({ moedas: moedasArray });
  }

  render() {

    const { moedas } = this.state;
    return (
      <div>
        <Header />
        <div className="App">
        <br></br>
        <Row className="justify-content-md-center">
        <Col xs lg="8">
        <Table striped bordered hover variant="primary" >
        <thead>
          <tr>
            <th colSpan="3" className="text-left">Indices</th>
          </tr>
          { moedas.map(moeda => (
                <tr>
                  <th>{moeda.name}</th>
                  <td>{moeda.pctChange}%</td>
                  <td>R$ {moeda.ask}</td>
                </tr>
             
        ))}
         </thead>
        </Table>
        </Col>
        </Row>
       
        </div>
      </div>
      
    );
  };
};

export default App;
