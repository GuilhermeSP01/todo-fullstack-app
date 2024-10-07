import './index.css'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './ThemeProvider';

// import HomePage from './routes/HomePage';
// import NotFoundPage from './routes/NotFoundPage';
// import AuthPage from './routes/auth/AuthPage';
import AuthProvider, { useAuth } from './components/context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import AuthPage from './routes/auth/AuthPage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     errorElement: <NotFoundPage />,
//   }, {
//     path: '/auth',
//     element: <AuthPage />
//   }
// ]);

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
        {/* <RouterProvider router={router} /> */}

        <BrowserRouter>
          <Routes>

            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/" element={
              <AuthenticatedRoute> <HomePage /> </AuthenticatedRoute>
            } />
            
          </Routes>
        </BrowserRouter>

      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
