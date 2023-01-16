import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLocationDot,
  faMagnifyingGlass,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import App from './App';
import './index.css';

library.add(faLocationDot, faMagnifyingGlass, faCheck);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
