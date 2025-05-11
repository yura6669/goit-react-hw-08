import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const LoginForm = () => {
    const emailId = useId();
    const passwordId = useId();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or less')
    .required('Password is required'),
    });

    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => { 
        dispatch(login(values));
        actions.resetForm();
    }
    
  return (
      <div className={css.container}>
        <h2 className={css.title}>Login</h2>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        <Form className={css.form}>
            <div className={css.fields}>
                <Field type="email" name="email" placeholder="Email" className={css.field} />
                <ErrorMessage name="email" component="span" className={css.error} />
                <Field type="password" name="password" placeholder="Password" className={css.field} />
                <ErrorMessage name="password" component="span" className={css.error} />
            </div>
            <button type="submit" className={css.signIn}>Sign In</button>
        </Form>
          </Formik>
          <p className={css.noHaveAccount}>Don't have an account?
            <Link to="/register" className={css.noHaveAccountLink} >Sign Up</Link>
        </p>
      </div>
  )
}

export default LoginForm