import React, { Component } from 'react';

import Routes from  './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

 
class App extends Component {

  render() {
    
    return (
      <div id="app-element">
          <Routes></Routes>
          {/* <Router>
            
            
            <div>

              <Switch>
                {/* <Route path="/usuario">
                  <Usuario />
                </Route> */}
                {/* <Route path="/chave">
                  <Servicos />
                </Route>
                <Route path="/">
                  <Home></Home>
                </Route>
                <Route exact path="/usuarios/:id" component={DetalhesUsuario} />
                <Route path="/novoUsuario" component={CriarUsuario} />
              </Switch> */}
            {/* </div> */}
          {/* </Router> */}
      </div>
    );
  };
};

export default App;
