import styles from './interface-adapters-controllers-user.module.css';

/* eslint-disable-next-line */
export interface InterfaceAdaptersControllersUserProps {}

export function InterfaceAdaptersControllersUser(
  props: InterfaceAdaptersControllersUserProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InterfaceAdaptersControllersUser!</h1>
    </div>
  );
}

export default InterfaceAdaptersControllersUser;
