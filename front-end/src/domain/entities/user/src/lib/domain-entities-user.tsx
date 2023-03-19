import styles from './domain-entities-user.module.css';

/* eslint-disable-next-line */
export interface DomainEntitiesUserProps {}

export function DomainEntitiesUser(props: DomainEntitiesUserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DomainEntitiesUser!</h1>
    </div>
  );
}

export default DomainEntitiesUser;
