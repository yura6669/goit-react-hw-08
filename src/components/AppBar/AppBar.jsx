import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import css from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
      <header className={css.header}>
        <Logo />
          <nav className={css.nav}>
            <Navigation />
            {!isLoggedIn && <AuthNav />}
          </nav>
          {isLoggedIn && <UserMenu />}
    </header>
  )
}

export default AppBar