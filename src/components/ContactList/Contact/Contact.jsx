import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contacts/operations';
import { setCurrentContact } from '../../../redux/contacts/slice';
import { toast } from 'react-hot-toast';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => { 
    dispatch(deleteContact(contact.id));
    toast.success(`Contact ${contact.name} deleted`);
  }
  const number = contact.number;
  return (
      <div className={css.container}>
          <ul>
             <li>
                  <FaUser className={css.icon} />
                  <p>{ contact.name }</p>
            </li>
              <li>
                  <FaPhoneAlt className={css.icon} />
                  <p>{ number }</p>
            </li>
          </ul>
      <div className={css.btns}>
        <button className={css.buttonUpdate} type="button" onClick={() => dispatch(setCurrentContact(contact))}>Update</button>
        <button className={css.buttonDelete} type="button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  )
}

export default Contact