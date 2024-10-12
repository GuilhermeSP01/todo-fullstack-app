import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './ThemeProvider';

import HomePage from './routes/HomePage';
import NotFoundPage from './routes/NotFoundPage';
import AuthPage from './routes/auth/AuthPage';
import AuthProvider, { useAuth } from './components/context/AuthContext';
import axios from 'axios';
import TodosPage from './routes/todos/TodosPage'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedRoute> <HomePage /> </AuthenticatedRoute>,
    errorElement: <AuthenticatedRoute> <NotFoundPage /> </AuthenticatedRoute>,
  }, {
    path: '/auth',
    element: <AuthPage />
  }, {
    path: '/todos',
    element: <AuthenticatedRoute> <TodosPage /> </AuthenticatedRoute>
  }
]);

function AuthenticatedRoute( {children}: { children: React.ReactNode } ) {
  const authContext = useAuth();
  const [validated, setValidated] = useState(false);

  if (!authContext.isAuthenticated) {

    if(localStorage.getItem('token')) {
      axios.get('http://localhost:8080/hello', { headers: { Authorization: `${localStorage.getItem('token')}` } })
        .then( (response) => {
          response.status == 200 ? setValidated(true) : setValidated(false);
        } )
    }

    if(validated) {
      authContext.isAuthenticated = true;
      authContext.username = localStorage.getItem('username');
      authContext.email = localStorage.getItem('email');
      authContext.token = localStorage.getItem('token');
      return children;
    }
    
    return <AuthPage />
  }

  return children
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
