import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './ThemeProvider';

import HomePage from './routes/HomePage';
import NotFoundPage from './routes/NotFoundPage';
import AuthPage from './routes/auth/AuthPage';
import AuthProvider, { useAuth } from './components/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedRoute> <HomePage /> </AuthenticatedRoute>,
    errorElement: <AuthenticatedRoute> <NotFoundPage /> </AuthenticatedRoute>,
  }, {
    path: '/auth',
    element: <AuthPage />
  }
]);

function AuthenticatedRoute( {children}: { children: React.ReactNode } ) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return children
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
