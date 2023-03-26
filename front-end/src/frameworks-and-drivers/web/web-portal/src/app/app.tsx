import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import React from 'react';

const router = createBrowserRouter(routes);
export function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
