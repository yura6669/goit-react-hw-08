import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { selectAuthError } from "../../redux/auth/selectors";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const LoginPage = () => {
  const error = useSelector(selectAuthError);
  const isError = error !== null;
  return (
      <>
      <LoginForm />
        {isError && <ErrorMessage message={error} />}
      </>
  )
}

export default LoginPage