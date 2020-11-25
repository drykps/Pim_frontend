import axios from 'axios';

const auth = {token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBibG9ja2NoYWluc3RvcmFnZS5jb20iLCJjcmVhdGVkIjoxNjA1NDAwMzE5MzYyLCJleHAiOjE2MDYwMDUxMTl9.yzUbv8Bx0pXeNPodkYrM1hjkgEMh3tnGc5h1CmrtjJpoK_1dJ7fcMdcEw5TSHN8PzMJp1TXWih18a8TIUniUQw"};
const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL',
    basePURL: 'https://pim-gerenciamento-backend.herokuapp.com/',
});

const backend = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization' : `Bearer ${auth.token}` //where applicable
  },
});

export {
  api,
  backend
};