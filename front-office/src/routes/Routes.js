import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Commerce from '../pages/Commerce';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const routerData = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'commerce',
        element: <Commerce />,
    },
    {
        path: 'signin',
        element: <SignIn />,
    },
    {
        path: 'signup',
        element: <SignUp />
    }
];

const router = createBrowserRouter(routerData);

export default router;
