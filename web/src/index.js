import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './components/Page';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />
  },
]);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);