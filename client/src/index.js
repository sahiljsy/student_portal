import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';
ReactDom.render(<App />, document.getElementById('root'));