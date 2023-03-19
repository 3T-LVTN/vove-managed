import styles from './application-usecases-user.module.css';

/* eslint-disable-next-line */
export interface ApplicationUsecasesUserProps {}

export function ApplicationUsecasesUser(props: ApplicationUsecasesUserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApplicationUsecasesUser!</h1>
    </div>
  );
}

export default ApplicationUsecasesUser;
