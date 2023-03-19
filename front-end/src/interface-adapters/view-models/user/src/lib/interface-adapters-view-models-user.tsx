import styles from './interface-adapters-view-models-user.module.css';

/* eslint-disable-next-line */
export interface InterfaceAdaptersViewModelsUserProps {}

export function InterfaceAdaptersViewModelsUser(
  props: InterfaceAdaptersViewModelsUserProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InterfaceAdaptersViewModelsUser!</h1>
    </div>
  );
}

export default InterfaceAdaptersViewModelsUser;
