import { MdPerson } from 'react-icons/md';
import { supabase } from '../../lib/supabaseClient';
import Button from '../button/Button';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
            <h1><span className={styles.logoC}>C</span><span className={styles.logoG}>G</span></h1>
        </div>
        <div className={styles.actions}>
          <Button
            variant="text"
            size="medium"
            leftIcon={<MdPerson size={24} />}
            className={styles.profileButton}>
              Profile
          </Button>
          <Button
            variant="secondary"
            size="medium"
            onClick={handleSignOut}
            className={styles.signOutButton}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
