import React, { Component  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {backend} from '../../api';
import './index.css';
import Modal from 'react-modal';
//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só
//para importar o css, venho direto aqui tbm


var appElement = document.getElementById('app-element');

Modal.setAppElement(appElement);

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
class Chaves extends Component {

  constructor(props) {
    super(props);

    this.state = {
        chave: {
            nomeChave: "",
            valorChave: "",
        },
        redirect: false,
        chaveSelecionada: {},
        chaves: [],
        erro: null,
        modalNovoIsOpen: false,
        modalDetalharIsOpen: false,
        modalAlterarIsOpen: false,
        modalExcluirIsOpen: false,
    };

}
exibeErro() {
    const { erro } = this.state;

    if (erro) {
        return (
            <div className="alert alert-danger" role="alert">
                Erro de conexão com o servidor
            </div>
        );
    }
}

openModal = (chave, modal) => {
    switch(modal){
        case 'novo':
            this.setState({modalNovoIsOpen: true});
            break;
        case 'detalhar':
            this.setState({modalDetalharIsOpen: true, chaveSelecionada: chave});
            break;
        case 'alterar':
            this.setState({modalAlterarIsOpen: true, chaveSelecionada: chave});
            break;
        case 'excluir':
            this.setState({modalExcluirIsOpen: true, chaveSelecionada: chave});
            break;
        
    }
    
}

closeModal = () => {
    this.setState({modalNovoIsOpen: false, modalExcluirIsOpen: false, modalAlterarIsOpen: false, modalDetalharIsOpen: false, chaveSelecionada: {}});
}

handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({modalIsOpen: false});
}

handleSaveClicked = (e) => {
    console.log(this.state.chaveSelecionada);
    backend.post(`/chave`, this.chave.chaveSelecionada).then((res)=>{
        console.log(res.status);
        console.log(res.data.data);
    });
    alert('Save button was clicked');
}

handlePutClick = (e) => {
    backend.put(`/chave`);
};

handleClick = (e) => {
    const id = this.state.chaveSelecionada.id;
    backend.delete(`/chave/${id}`);
};

handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
        chave: { ...prevState.chave, [name]: value }
    }));
    console.log(value);
};

async componentDidMount() {
    const res = await backend.get('/chave/0/10');
    if( res && res.data){
        console.log(res);
        this.setState({chaves: res.data.data.content});
    }
}

    render() {
        
        const { chaves } = this.state;
        return (
            <div className="chave-list">
                <button type="button" className="btn btn-success" onClick={()=> this.openModal(null, 'novo')}>Adicionar</button>
                <br /><br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Chave</th>
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
                                <td>{chave.valorChave.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{chave.categoria}</td>
                                <td>{new Date(chave.dataCriacao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td><button type="button" className="btn btn-primary" onClick={()=> this.openModal(chave, 'detalhar')}>Detalhes</button></td>
                                <td><button type="button" className="btn btn-warning" onClick={()=> this.openModal(chave, 'alterar')}>Atualizar</button></td>
                                <td><button type="button" className="btn btn-danger" onClick={()=> this.openModal(chave, 'excluir')}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* //------- Modal criar --------// */}
                <div>
                    <Modal isOpen={this.state.modalNovoIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Novo</h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset>
                                    <div className="chave-insert">
                                        <label htmlFor="nomeChave">Descrição chave</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="nomeChave"
                                            name="nomeChave"
                                            placeholder="Descrição"
                                            minLength="3"
                                            maxLength="100"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.chave.nomeChave}
                                        />
                                    </div>
                                    <div className="chave-insert">
                                        <label htmlFor="valorChave">Valor Chave</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="valorChave"
                                            name="valorChave"
                                            placeholder="Valor Chave"
                                            minLength="3"
                                            maxLength="150"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.chave.valorChave}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSaveClicked}>
                                        Cadastrar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.closeModal}>Save changes</button>
                        </div> */}
                    </Modal>
                </div>
                {/* //------- Modal detalhes --------// */}
                <div>
                    <Modal isOpen={this.state.modalDetalharIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Detalhes chave {this.state.chaveSelecionada.nomeChave} </h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <h3> {this.state.chaveSelecionada.nomeChave} </h3>
                            <h3> {this.state.chaveSelecionada.valorChave} </h3>
                            <h3> {this.state.chaveSelecionada.categoria} </h3>
                            <h3> {this.state.chaveSelecionada.dataCriacao} </h3>
                            <br />
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        </div>
                    </Modal>
                </div>
                {/* //------- Modal editar --------// */}
                <div>
                    <Modal isOpen={this.state.modalAlterarIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Alterar chave {this.state.chaveSelecionada.nomeChave}</h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <form>
                                <fieldset>
                                    <div className="chave-update">
                                        <label htmlFor="nomeChave">Descrição chave</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="nomeChave"
                                            name="nomeChave"
                                            placeholder="Descrição"
                                            minLength="3"
                                            maxLength="100"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.chave.nomeChave}
                                        />
                                    </div>
                                    <div className="chave-insert">
                                        <label htmlFor="valorChave">Valor Chave</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="valorChave"
                                            name="valorChave"
                                            placeholder="Valor Chave"
                                            minLength="3"
                                            maxLength="150"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.chave.valorChave}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-primary" onClick={this.handlePutClick}>
                                        Atualizar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </Modal>
                </div>
                {/* //------- Modal excluir --------// */}
                <div>
                    <Modal isOpen={this.state.modalExcluirIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Exclusão item {this.state.chaveSelecionada.nomeChave}</h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <p>Tem certeza que deseja deletar este registro?</p> 
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Excluir</button>
                        </div>
                    </Modal>
                </div>
            </div>
      );
    };

  };

  export default Chaves;