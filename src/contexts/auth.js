import React, {useEffect, useState} from  'react';

import {backend} from '../api';

import { KEY_TOKEN_STORAGE, KEY_USUARIO_STORAGE } from '../utils/constants';

const   AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {         
    const [usuario, setUsuario] = useState({ informacoes:{  nome: 'Sem nome', iniciais: 'SN'  }, logado: false});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storagedUser = localStorage.getItem(KEY_USUARIO_STORAGE);
        const storagedToken = localStorage.getItem(KEY_TOKEN_STORAGE);
    
        if (storagedToken && storagedUser) {
          setUsuario(JSON.parse(storagedUser));
        }

        setLoading(false);

    }, []);


    // Login atualiza valores
    async function login(email, password) {     
        const res = await backend.post("/api/auth", { email, password });   

        if(res.data.erros && res.data.erros.length > 0 ){
            return res.data.erros[0];
        }

        let informacoes = res.data.usuario;
        let token = res.data.token;
        
        if(!informacoes.nome){
            informacoes.nome = "Sem nome";
            informacoes.iniciais  = "SN";
        }else{
            let nome = informacoes.nome.split();
            let iniciais = '';
            if(nome.length > 1){
                iniciais = nome[0].slice(0,1) + nome[1].slice(0,1);
            }else{
                iniciais = nome[0].slice(0,2);
            }
            informacoes.iniciais = iniciais.toUpperCase();
        }

        localStorage.setItem(KEY_TOKEN_STORAGE, token);
        localStorage.setItem(KEY_USUARIO_STORAGE, JSON.stringify({ informacoes, logado: true }));
        setUsuario({ informacoes, logado: true });
    };

    // Logout limpa valores
    function logout() {
        localStorage.removeItem(KEY_TOKEN_STORAGE);
        localStorage.removeItem(KEY_USUARIO_STORAGE);
        setUsuario({ informacoes:{ nome: 'Sem nome', iniciais: 'SN' }, logado: false });
    };

    return(
    <AuthContext.Provider value={{ usuario, login, logout, loading  }}>
      {children}
    </AuthContext.Provider>
)};

export {
    AuthProvider,
    AuthContext
}