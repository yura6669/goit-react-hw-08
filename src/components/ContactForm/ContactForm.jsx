import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from './ContactForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { selectContacts } from "../../redux/contactsSlice";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
    const nameId = useId();
    const numberId = useId();

    const initialValues = {
        name: '',
        number: ''
    };

    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const handleSubmit = (values, actions) => {
        const { name, number } = values;
        const newContact = {
            name: name,
            number: number
        };
        const isDublicateNumber = contacts.find(contact => contact.number === newContact.number);
        if (isDublicateNumber) {
            toast.error(`Contact with number ${newContact.number} already exists`);
            return;
        }
        dispatch(addContact(newContact));
    actions.resetForm();
    };
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .max(50, 'Name must be at most 50 characters long')
            .required('Name is required'),
        number: Yup.string()
            .min(9, 'Number must be at least 8 characters long')
            .max(13, 'Number must be at most 13 characters long')
            .required('Number is required')
    });

  return (
      <>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
              <Form className={css.form}>
                  <label htmlFor={nameId}>Name</label>
                  <Field type="text" name="name" id={nameId} placeholder="Name" />
                  <ErrorMessage name="name" component="span" className={css.error} />
                  <label htmlFor={numberId}>Number</label>
                  <Field type="tel" name="number" id={numberId} placeholder="Number" />
                  <ErrorMessage name="number" component="span" className={css.error} />
                    <button type="submit">Add contact</button>
              </Form>
          </Formik>
          <Toaster position='top-right' toastOptions={{
        style: {
          background: 'red',
          color: 'white',
        },
      }}/>
    </>
  )
}

export default ContactForm