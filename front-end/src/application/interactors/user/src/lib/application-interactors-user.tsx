import styles from './application-interactors-user.module.css';

/* eslint-disable-next-line */
export interface ApplicationInteractorsUserProps {}

export function ApplicationInteractorsUser(
  props: ApplicationInteractorsUserProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApplicationInteractorsUser!</h1>
    </div>
  );
}

export default ApplicationInteractorsUser;
