import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Commerce from '../pages/Commerce';
import App from '../components/App';

export const routerData = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'commerce',
        element: <Commerce />
    }
];

const router = createBrowserRouter(routerData);

export default router;
