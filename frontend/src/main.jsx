import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';
import { SearchFilterProvider } from './context/SearchFilterContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isValidClerkKey = Boolean(PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith('pk_'));

const RootApp = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchFilterProvider>
        <App />
      </SearchFilterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

if (isValidClerkKey) {
  ReactDOM.createRoot(rootElement).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {RootApp}
    </ClerkProvider>
  );
} else {
  ReactDOM.createRoot(rootElement).render(RootApp);
}
