import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
    const activeLink = ({ isActive }) => { 
    return clsx(css.navigation, {
        [css.active]: isActive,
    });
    }
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
      <>
        <NavLink to='/' className={activeLink}>Home</NavLink>
        { isLoggedIn && <NavLink to='/contacts' className={activeLink}>Contacts</NavLink>}
      </>
  )
}

export default Navigation