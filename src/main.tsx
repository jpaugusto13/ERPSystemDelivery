import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes/App.routes.tsx';

import { QueryClientProvider } from "@tanstack/react-query"
import './index.css';
import './styles/main.scss';
import { queryClient } from './lib/react-query.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
);
