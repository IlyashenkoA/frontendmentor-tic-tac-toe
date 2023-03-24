import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { TicTacToe } from './TicTacToe';

import './index.css';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TicTacToe />
    </Provider>
  </React.StrictMode>
);
