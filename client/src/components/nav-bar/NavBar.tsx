import React, { useState } from 'react';
import { MdLogout, MdPerson, MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import Button from '../button/Button';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const hamburgerIconVariants = {
    menu: { rotate: 0 },
    close: { rotate: 180 },
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div onClick={() => navigate('/')} className={styles.logo}>
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
            onClick={handleProfileClick}
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

        <motion.button
          className={styles.hamburgerButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            variants={hamburgerIconVariants}
            animate={isMobileMenuOpen ? "close" : "menu"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.mobileMenuContent}>
              <motion.div variants={menuItemVariants}>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleProfileClick}
                  leftIcon={<MdPerson size={24} />}
                  className={styles.mobileProfileButton}>
                    Profile
                </Button>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Button
                  variant="secondary-subtle"
                  size="medium"
                  onClick={handleSignOut}
                  className={styles.mobileSignOutButton}
                  leftIcon={<MdLogout size={24} />}
                >
                  Sign Out
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
