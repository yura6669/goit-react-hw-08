import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;
export const selectCurrentContact = (state) => state.contacts.currentContact;

export const selectFilteredContacts = createSelector(selectContacts, selectNameFilter, (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().replaceAll(' ', '').includes(normalizedFilter)
    );
 });