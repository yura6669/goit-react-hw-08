import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from './ContactForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectContacts, selectCurrentContact } from "../../redux/contacts/selectors";
import { addContact } from "../../redux/contacts/operations";
import { useMask } from "@react-input/mask";
import { setCurrentContact } from "../../redux/contacts/slice";
import { updateContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const currentContact = useSelector(selectCurrentContact);
  const isEditMode = Boolean(currentContact);
  const inputRef = useMask({
    mask: "+380 __ ___ __ __",
    replacement: { _: /\d/ },
  });
  
  let initialValues = {
    name: '',
    number: '+380'
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
            actions.resetForm();
            return;
        }
      if (isEditMode) {
        const data = {
          "contactId": currentContact.id,
          "contact": newContact,
        };
        dispatch(updateContact(data));
        dispatch(setCurrentContact(null));
        toast.success(`Contact ${newContact.name} updated`);
      } else {
        dispatch(addContact(newContact));
        toast.success(`Contact ${newContact.name} added`);
        }
    actions.resetForm();
    };
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .max(50, 'Name must be at most 50 characters long')
            .required('Name is required'),
        number: Yup.string()
            .matches(/^\+380 \d{2} \d{3} \d{2} \d{2}$/, 'Phone number must be contains 17 characters')
          .required('Number is required'),
    });
  
  if (isEditMode) { 
    initialValues = {
      name: currentContact.name,
      number: currentContact.number
    };
  }

  return (
      <>
      <Formik initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true} >
        <Form className={css.form}>
            <div className={css.fields}>
                <Field type="text" name="name" placeholder="Name" className={css.field} />
                <ErrorMessage name="name" component="span" className={css.error} />
                <Field ref={inputRef} type="tel" name="number" placeholder="+380" className={css.field} />
                <ErrorMessage name="number" component="span" className={css.error} />
            </div>
          <button type="submit">
            {isEditMode ? 'Update contact' : 'Add contact'}
          </button>
          {isEditMode &&
            <button type="button" onClick={() => dispatch(setCurrentContact(null))} className={css.closeBtn}>Close</button>}
        </Form>
      </Formik>
    </>
  )
}

export default ContactForm