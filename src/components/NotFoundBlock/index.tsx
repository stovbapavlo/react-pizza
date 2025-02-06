import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>☹️</span>
        <br />
        nothing found
      </h1>
      <p className={styles.description}>unfortunately this page is unavailable</p>
    </div>
  );
};
