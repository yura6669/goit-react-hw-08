import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = () => { 
        dispatch(logout());
    }
  return (
      <>
          <p className={css.greeting}>Welcome, <span>{user.name}</span></p>
          <button onClick={handleLogout} className={css.logout}>Logout</button>
      </>
  )
}

export default UserMenu