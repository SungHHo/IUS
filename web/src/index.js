import "./global.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './components/Page';
import Map from "./components/Map";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />
  },
  {
    path: "/map",
    element: <Map />
  }
])
root.render(
  <>
    <RouterProvider router={router} />
  </>
);