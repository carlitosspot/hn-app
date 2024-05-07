import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './footer.module.css';
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <span className={styles.appName}>Hacker News</span>
        <div className={styles.links}>
          <NavLink to="/" className={styles.link}>
            latest
          </NavLink>
          <span> | </span>
          <NavLink to="/starred" className={styles.link}>
            starred
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
