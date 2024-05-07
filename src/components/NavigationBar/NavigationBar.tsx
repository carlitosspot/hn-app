import React from 'react';
import { NavLink } from 'react-router-dom';
import hnLogo from './../../assets/logo.svg';
import styles from './navigationbar.module.css';

type NavLinkProp = {
  isActive: boolean;
};

const NavigationBar: React.FC = () => {
  const getNavLinkClass = ({ isActive }: NavLinkProp) => {
    return isActive
      ? `${styles.navigatorItem} ${styles.active}`
      : styles.navigatorItem;
  };

  return (
    <nav
      className={`navbar ${styles.navigator}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img src={hnLogo} alt="Hacker News logo" />
        </NavLink>

        <div className={styles.menu}>
          <NavLink to="/" className={getNavLinkClass}>
            latest
          </NavLink>
          <span className={styles.separator}>|</span>
          <NavLink to="/starred" className={getNavLinkClass}>
            starred
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
