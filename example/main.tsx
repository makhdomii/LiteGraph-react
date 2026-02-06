import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'litegraph.js/css/litegraph.css';
import '../dist/lightgraph.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
