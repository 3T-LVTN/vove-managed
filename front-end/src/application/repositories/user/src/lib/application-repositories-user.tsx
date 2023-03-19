import styles from './application-repositories-user.module.css';

/* eslint-disable-next-line */
export interface ApplicationRepositoriesUserProps {}

export function ApplicationRepositoriesUser(
  props: ApplicationRepositoriesUserProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApplicationRepositoriesUser!</h1>
    </div>
  );
}

export default ApplicationRepositoriesUser;
