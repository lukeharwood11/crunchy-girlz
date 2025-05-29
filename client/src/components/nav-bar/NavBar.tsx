import React from 'react';
import { MdLogout, MdPerson } from 'react-icons/md';
import { supabase } from '../../lib/supabaseClient';
import Button from '../button/Button';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img 
            src="/icon.svg" 
            alt="Crunchy Girlz" 
            className={styles.logoIcon}
            onError={(e) => {
              console.error('Failed to load icon:', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1>Crunchy Girlz</h1>
        </div>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="small"
            leftIcon={<MdPerson size={24} />}
            className={styles.profileButton}>
              Profile
          </Button>
          <Button
            variant="secondary-subtle"
            size="small"
            onClick={handleSignOut}
            className={styles.signOutButton}
            leftIcon={<MdLogout size={24} />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
