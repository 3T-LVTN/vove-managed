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
import InquiryDetail from "../views/inquiry-detail/inquiry-detail";
import AppAnalysis from "../views/app-analysis/app-analysis";
import DistrictSummary from "../views/district-summary/district-summary";
import DistrictDetail from "../views/district-detail/district-detail";
import WardDetail from "../views/ward-detail/ward-detail";

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
      },
      {
        path: 'inquiries/:id',
        element: <InquiryDetail/>,
      },
      {
        path: 'app-analysis',
        element: <AppAnalysis/>,
      },
      {
        path: 'districts',
        element: <DistrictSummary/>,
      },
      {
        path: 'districts/:id',
        element: <DistrictDetail/>,
      },
      {
        path: 'districts/:id/wards/:wardId',
        element: <WardDetail/>,
      }
    ],
    errorElement: <PageNotFound/>
  },
] as RouteObject[];
