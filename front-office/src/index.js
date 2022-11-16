import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from '@emotion/react';

import router from './routes/Routes';
import { Theme } from './context/ThemeContext';
import AccountContextProvider from './context/CurrentAccountContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <AccountContextProvider>
        <RouterProvider router={router} />
      </AccountContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO Move into the pages folder without breaking npm start