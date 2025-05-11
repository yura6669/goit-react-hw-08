import { useSelector } from "react-redux";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { selectAuthError } from "../../redux/auth/selectors";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const RegistrationPage = () => {
    const error = useSelector(selectAuthError);
    const isError = error !== null;
  return (
      <>
          <RegisterForm />
            {isError && <ErrorMessage message={error} />}
      </>
  )
}

export default RegistrationPage