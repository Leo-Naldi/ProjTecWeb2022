import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './assets/stylesheets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './routes/Routes';
import { Theme } from './context/ThemeContext';
import AccountContextProvider from './context/CurrentAccountContext';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AccountContextProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AccountContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO Move into the pages folder without breaking npm start