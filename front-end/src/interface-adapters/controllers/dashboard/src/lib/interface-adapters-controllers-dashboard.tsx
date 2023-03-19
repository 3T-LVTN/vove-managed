import styles from './interface-adapters-controllers-dashboard.module.css';

/* eslint-disable-next-line */
export interface InterfaceAdaptersControllersDashboardProps {}

export function InterfaceAdaptersControllersDashboard(
  props: InterfaceAdaptersControllersDashboardProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InterfaceAdaptersControllersDashboard!</h1>
    </div>
  );
}

export default InterfaceAdaptersControllersDashboard;
