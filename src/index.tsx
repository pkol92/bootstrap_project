import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContextProvider } from './context/authContext';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { UserCardPage } from './features/UserCardPage';
import { RegisterPage } from './features/RegisterPage';
import { LoginPage } from './features/LoginPage';
import { ProductsContextProvider } from './context/productsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/my-card',
    element: <UserCardPage />,
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
]);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <RouterProvider router={router} />
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
