import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/dashboard';
import Login from "../views/login/login";
import {PageNotFound} from "../views/page-not-found/page-not-found";
import { Frame } from './frame';
import NxWelcome from "./nx-welcome";

export const routes = [
  {
    path: '/',
    element: <Frame/>,
    children: [
      {
        path: '/login',
        element: <Login/>,
      },
    ],
    errorElement: <PageNotFound/>
  },
] as RouteObject[];
