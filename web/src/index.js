import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './components/Page';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./global.css";
import Register from './components/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />
  },

  {
    path: "/register",
    element: <Register/>
  }
]);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);