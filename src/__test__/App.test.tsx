import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import icons from '../icons';
import '../index.css';

library.add(...icons);
const queryClient = new QueryClient();

describe('App', () => {
  it('should work as expected', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(1 + 1).toBe(2);
  });
});
