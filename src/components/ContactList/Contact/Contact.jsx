import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contactsOps';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const onDeleteContact = (id) => { 
    dispatch(deleteContact(id));
  }
  const number = contact.number.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll('.', '')
    .replaceAll(' ', '').replaceAll('x', '');
  const numberFormat = number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5, 7);
  return (
      <div className={css.container}>
          <ul>
              <li>
                  <FaUser className={css.icon} />
                  <p>{ contact.name }</p>
            </li>
              <li>
                  <FaPhoneAlt className={css.icon} />
                  <p>{ numberFormat }</p>
            </li>
          </ul>
            <button className={css.button} type="button" onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </div>
  )
}

export default Contact