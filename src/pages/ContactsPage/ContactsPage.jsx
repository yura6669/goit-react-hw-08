import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading, selectContactsError, selectContacts } from "../../redux/contacts/selectors";
import  ContactForm  from "../../components/ContactForm/ContactForm";
import  SearchBox  from "../../components/SearchBox/SearchBox";
import  ContactList from "../../components/ContactList/ContactList";
import  Loader  from "../../components/Loader/Loader";
import  ErrorMessage  from "../../components/ErrorMessage/ErrorMessage";

const ContactsPage = () => {
    const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectContactsError);
  const isError = error !== null;
  const contacts = useSelector(selectContacts);
  const isContacts = contacts.length > 0;

  useEffect(() => { 
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
      <>
      <ContactForm />
      {isContacts &&  <SearchBox />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error} />}
      <ContactList />
      </>
  )
}

export default ContactsPage