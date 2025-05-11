import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
    const activeLink = ({ isActive }) => { 
    return clsx(css.navigation, {
        [css.active]: isActive,
    });
}
  return (
      <>
        <NavLink to='/' className={activeLink}>Home</NavLink>
        <NavLink to='/contacts' className={activeLink}>Contacts</NavLink>
      </>
  )
}

export default Navigation