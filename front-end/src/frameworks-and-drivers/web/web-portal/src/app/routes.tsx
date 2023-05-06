import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/dashboard';
import Login from "../views/login/login";
import {PageNotFound} from "../views/page-not-found/page-not-found";
import { Frame } from './frame';
import ResetPassword from "../views/reset-password/reset-password";
import Userlist from "../views/users/userlist";
import UserInfo from "../views/user-info/userinfo";
import {ModelManagement} from "../views/model-management/model-management";
import InquiryList from "../views/inquiry-list/inquiry-list";

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
      },
      {
        path: 'users/:id',
        element: <UserInfo/>,
      },
      {
        path: 'model-management',
        element: <ModelManagement/>,
      },
      {
        path: 'inquiries',
        element: <InquiryList/>,
      }
    ],
    errorElement: <PageNotFound/>
  },
] as RouteObject[];
