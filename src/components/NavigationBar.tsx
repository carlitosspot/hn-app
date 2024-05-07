import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/starred" className="navbar-item">Starred</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
