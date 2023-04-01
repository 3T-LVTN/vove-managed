import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/dashboard';
import Login from "../views/login/login";
import { Frame } from './frame';
import ResetPassword from "../views/reset-password/reset-password";

export const routes = [
  {
    path: '',
    element: <Frame/>,
    children: [
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path: 'reset-password',
        element: <ResetPassword/>,
      },
    ],
  },
] as RouteObject[];
