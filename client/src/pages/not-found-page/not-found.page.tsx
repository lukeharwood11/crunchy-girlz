import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import styles from './not-found.page.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img 
            src="/sad.svg" 
            alt="Sad Crunchy Girlz" 
            className={styles.sadIcon}
            onError={(e) => {
              console.error('Failed to load sad icon:', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className={styles.title}>Oops! Page Not Found</h1>
          <p className={styles.message}>
            Sorry, the page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.linkButton}>
              <Button variant="primary" size="medium">
                Go Home
              </Button>
            </Link>
            <Link to="/" className={styles.linkButton}>
              <Button variant="secondary" size="medium">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
