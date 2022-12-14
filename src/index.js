import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import store from './store';
import { LOGOUT } from './actions/types';

const baseURL = 'http://localhost:5000/api';
axios.interceptors.request.use(
  (config) => {
    config.url = baseURL + config.url;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.log(error);
  }
);
// api.interceptors.response.use(
//     (res) => res,
//     (err) => {
//       if (err.response.status === 401) {
//         store.dispatch({ type: LOGOUT });
//       }
//       return Promise.reject(err);
//     }
//   );
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
