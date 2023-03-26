import {UserInteractor} from "@front-end/application/interactors/user";
import {DashboardControllers} from "@front-end/interface-adapters/controllers/dashboard";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import {UserViewModels} from "@front-end/interface-adapters/view-models/user";
import {useEffect, useState} from "react";
import styles from './dashboard.module.css';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  // const authRepository = new AuthCognito();
  // const userUseCase = new UserInteractor(authRepository);
  // const userController = new UserController(userUseCase);

  const [error, setError] = useState(false);


  const [user, setUser] = useState<UserViewModels>();
  // useEffect(() => {
  //   userController.getUser().then(setUser).catch(setError);
  // }, []);

  return (
    <div className={styles['container']}>
      <h1 data-testid="email">user email: {user && user.email}</h1>
      <h1>{error && `${error}`}</h1>
    </div>
  );
}

export default Dashboard;
