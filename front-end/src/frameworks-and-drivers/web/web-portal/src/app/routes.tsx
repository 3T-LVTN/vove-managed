import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/dashboard';
import Login from "../views/login/login";
import {PageNotFound} from "../views/page-not-found/page-not-found";
import { Frame } from './frame';
import ResetPassword from "../views/reset-password/reset-password";
import Userlist from "../views/users/userlist";

export const routes = [
  {
    path: '',
    element: <Frame />,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path: 'reset-password',
        element: <ResetPassword/>,
      },
      {
        path: 'users',
        element: <Userlist/>,
      }
    ],
    errorElement: <PageNotFound/>
  },
] as RouteObject[];
