import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";
const initialState = {
    items: [],
    loading: false,
    error: null,
    currentContact: null,
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
        }).addCase(updateContact.fulfilled, (state, action) => { 
            const index = state.items.findIndex((contact) => contact.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }).addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending, updateContact.pending), (state) => {
            state.loading = true;
            state.error = null;
        }).addMatcher(isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled, updateContact.fulfilled), (state) => {
            state.loading = false;
        }).addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected, updateContact.rejected), (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        })
    },
    reducers: {
        setCurrentContact: (state, action) => { 
            state.currentContact = action.payload;
            console.log("currentContact", state.currentContact);
        }
    },
});

export const { setCurrentContact } = slice.actions;
export const contactsReducer = slice.reducer;