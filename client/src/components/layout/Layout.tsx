import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../nav-bar/NavBar';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 