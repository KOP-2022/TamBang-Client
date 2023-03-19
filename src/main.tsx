import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DevTools } from 'jotai-devtools';

import App from './App';
import icons from './icons';
import { worker } from './mocks/browser';

import './index.css';

if (import.meta.env.MODE === 'mocking')
  worker.start({ onUnhandledRequest: 'bypass' });

library.add(...icons);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <DevTools />
        <App />
        <ReactQueryDevtools />
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);
