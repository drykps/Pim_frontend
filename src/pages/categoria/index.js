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
class Categoria extends Component {

  constructor(props) {
    super(props);

    this.state = {
        categoria: {
            nome: "",
            descricao: "",
            ativo: true
        },
        redirect: false,
        categoriaSelecionada: {},
        categorias: [],
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

openModal = (categoria, modal) => {
    switch(modal){
        case 'novo':
            this.setState({modalNovoIsOpen: true});
            break;
        case 'detalhar':
            this.setState({modalDetalharIsOpen: true, categoriaSelecionada: categoria});
            break;
        case 'alterar':
            this.setState({modalAlterarIsOpen: true, categoriaSelecionada: categoria});
            break;
        case 'excluir':
            this.setState({modalExcluirIsOpen: true, categoriaSelecionada: categoria});
            break;
        
    }
    
}

closeModal = () => {
    this.setState({modalNovoIsOpen: false, modalExcluirIsOpen: false, modalAlterarIsOpen: false, modalDetalharIsOpen: false, categoriaSelecionada: {}});
}

handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({modalIsOpen: false});
}

handleSaveClicked = (e) => {
    // Simple POST request with a JSON body using axios
    const categoria = {Categoria};
    backend.post('/categoria', categoria)
        .then(response => this.setState({ categoriaId: response.data.id }));
}
// handleSaveClicked = (e) => {
//     console.log(this.state.categoriaSelecionada);
//     backend.post(`/categoria`, this.categoria.categoriaSelecionada).then((res)=>{
//         console.log(res.status);
//         console.log(res.data.data);
//     });
//     alert('Save button was clicked');
// }

handlePutClick = (e) => {
    backend.put(`/categoria`);
};

handleClick = (e) => {
    const id = this.state.categoriaSelecionada.id;
    backend.delete(`/categoria/${id}`);
};

handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
        categoria: { ...prevState.categoria, [name]: value }
    }));
    console.log(value);
};

async componentDidMount() {
    const res = await backend.get('/categoria/0/10');
    if( res && res.data){
        console.log(res);
        this.setState({categorias: res.data.data.content});
    }
}

    render() {
        
        const { categorias } = this.state;
        return (
            <div className="categoria-list">
                <button type="button" className="btn btn-success" onClick={()=> this.openModal(null, 'novo')}>Adicionar</button>
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
                                <td><button type="button" className="btn btn-primary" onClick={()=> this.openModal(categoria, 'detalhar')}>Detalhes</button></td>
                                <td><button type="button" className="btn btn-warning" onClick={()=> this.openModal(categoria, 'alterar')}>Atualizar</button></td>
                                <td><button type="button" className="btn btn-danger" onClick={()=> this.openModal(categoria, 'excluir')}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* //------- Modal criar --------// */}
                <div>
                    <Modal isOpen={this.state.modalNovoIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Incluir Categoria</h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset>
                                    <div className="categoria-insert">
                                        <label htmlFor="nome">Nome Categoria</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            minLength="3"
                                            maxLength="100"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.categoria.nome}
                                        />
                                    </div>
                                    <div className="categoria-insert">
                                        <label htmlFor="descricao">Descrição</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="descricao"
                                            name="descricao"
                                            minLength="3"
                                            maxLength="150"
                                            onChange={this.handleInputChange}
                                            value={this.state.categoria.descricao}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSaveClicked}>
                                        Cadastrar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </Modal>
                </div>
                {/* //------- Modal detalhes --------// */}
                <div>
                    <Modal isOpen={this.state.modalDetalharIsOpen} style={customStyles}>
                        <div className="modal-header">
                        <h4 className="modal-title">Detalhes categoria {this.state.categoriaSelecionada.nome} </h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <h3> {this.state.categoriaSelecionada.nome} </h3>
                            <h3> {this.state.categoriaSelecionada.descricao} </h3>
                            <h3> {this.state.categoriaSelecionada.ativo} </h3>
                            <h3> {this.state.categoriaSelecionada.dataCriacao} </h3>
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
                        <h4 className="modal-title">Alterar Categoria {this.state.categoriaSelecionada.nome}</h4>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <form>
                                <fieldset>
                                    <div className="categoria-update">
                                        <label htmlFor="nome">Nome Categoria</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            minLength="3"
                                            maxLength="100"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.categoria.nome}
                                        />
                                    </div>
                                    <div className="categoria-insert">
                                        <label htmlFor="descricao">Descrição</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="descricao"
                                            name="descricao"
                                            minLength="3"
                                            maxLength="150"
                                            onChange={this.handleInputChange}
                                            value={this.state.categoria.descricao}
                                        />
                                    </div>
                                    <div className="categoria-insert">
                                    <label>
                                        <input
                                            type="radio"
                                            name="ativo"
                                            value="true"
                                            checked={this.state.categoria.ativo === "true"}
                                            onChange={this.handleInputChange}
                                        />
                                        Ativo
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="false"
                                            name="ativo"
                                            checked={this.state.categoria.ativo === "false"}
                                            onChange={this.handleInputChange}
                                        />
                                        Inativo
                                    </label>
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
            </div>
      );
    };

  };

  export default Categoria;