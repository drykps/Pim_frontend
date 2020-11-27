import React from 'react';

import Routes from  './routes';

import {AuthProvider} from './contexts/auth';
import {LoadingProvider} from './contexts/loading';

import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
    const token = localStorage.getItem('token') || '';
    const usuario = ( localStorage.getItem('usuario') && JSON.parse(localStorage.getItem('usuario')) ) || {};
    
    return (
        <LoadingProvider>
          <AuthProvider value={{usuario, token}}>
            <Routes></Routes>
          </AuthProvider>
        </LoadingProvider>
    );
};

export default App;
