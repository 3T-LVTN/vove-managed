import {ui} from "@front-end/frameworks-and-drivers/firebase-auth";
import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/dashboard';
import Login from "../views/login/login";
import { Frame } from './frame';
import NxWelcome from "./nx-welcome";

export const routes = [
  {
    path: '/',
    element: <Frame/>,
    children: [
      {
        path: '',
        element: <Login ui={ui}/>,
      },
    ],
  },
] as RouteObject[];
