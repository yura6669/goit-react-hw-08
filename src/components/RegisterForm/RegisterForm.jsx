import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";

const RegisterForm = () => {

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less')
    .required('Name is required'),

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
        dispatch(register(values));
        actions.resetForm();
    }
    
  return (
      <div className={css.container}>
        <h2 className={css.title}>Register</h2>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        <Form className={css.form}>
            <div className={css.fields}>
                <Field type="text" name="name" placeholder="Name" className={css.field} />
                <ErrorMessage name="name" component="span" className={css.error} />
                <Field type="email" name="email" placeholder="Email" className={css.field} />
                <ErrorMessage name="email" component="span" className={css.error} />
                <Field type="password" name="password" placeholder="Password" className={css.field} />
                <ErrorMessage name="password" component="span" className={css.error} />
            </div>
            <button type="submit" className={css.signUp}>Sign Up</button>
        </Form>
          </Formik>
          <p className={css.haveAccount}>Already have an account?
            <Link to="/login" className={css.haveAccoutLink} >Sign In</Link>
        </p>
      </div>
  )
}

export default RegisterForm