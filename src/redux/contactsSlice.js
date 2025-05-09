import { createSlice, isAnyOf, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import {selectNameFilter} from "./filtersSlice";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const slice = createSlice({
    name: "contacts",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload;
        }).addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload);
        }).addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter((contact) => contact.id !== action.payload.id);
        }).addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), (state) => {
            state.loading = true;
            state.error = null;
        }).addMatcher(isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled), (state) => {
            state.loading = false;
        }).addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(selectContacts, selectNameFilter, (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
 });

export default slice.reducer;