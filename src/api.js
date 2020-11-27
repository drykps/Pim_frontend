import axios from 'axios';

import { KEY_TOKEN_STORAGE } from './utils/constants';

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL',   
});


const backend = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

backend.interceptors.request.use(async (config) => {
  if (
    !config.url.endsWith('auth') ||
    !config.url.endsWith('usuario')
  ) {
    //const userTokenExpiration = new Date(localStorage.getItem('userTokenExpiration'));
    //const today = new Date();
    //if (today > userTokenExpiration) {
      // refresh the token here
    //  const userRefreshToken = localStorage.getItem('userRefreshToken');
    //} else {
      
      const userToken = localStorage.getItem(KEY_TOKEN_STORAGE);
      if(!!userToken){
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    //}
  }

  return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(error);
});

backend.interceptors.response.use((response) => {
  // Do something with response data
  return response;
},(error) => {
  // Do something with response error
  
  // You can even test for a response code 
  // and try a new request before rejecting the promise
  if ( error && error.response && error.response.status === 401) {     
    error.response.message = "Credenciais invalidas.";
  }
  return Promise.reject(error);
});

export {
  api,
  backend
};