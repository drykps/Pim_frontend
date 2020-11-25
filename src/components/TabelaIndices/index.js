import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm
import './index.css';
 


//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const TabelaIndices = ({indices}) => {

    return (
    <Row className="justify-content-md-center">
          <Col xs lg="8">
            <Table striped bordered hover variant="primary" >
            <thead>
              <tr>
                <th colSpan="3" className="text-left">Indices</th>
              </tr>
              { indices.map(indice => (
                    <tr key={indice.bid}>
                      <th>{indice.name}</th>
                      <td>{indice.pctChange}%</td>
                      <td>R$ {indice.ask}</td>
                    </tr>
                
            ))}
            </thead>
            </Table>
          </Col>
        </Row>
)
};

export default TabelaIndices;