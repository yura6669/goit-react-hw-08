import React from 'react'
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

const AuthNav = () => {
    const activeLink = ({ isActive }) => { 
    return clsx(css.authNav, {
        [css.active]: isActive,
    });
    }
   return (
      <>
        <NavLink to='/login' className={activeLink}>Login</NavLink>
        <NavLink to='/register' className={activeLink}>Register</NavLink>
      </>
  )
}

export default AuthNav