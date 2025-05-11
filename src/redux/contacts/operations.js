import { createAsyncThunk } from "@reduxjs/toolkit";

import { contactAPI } from "../auth/operations";
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, {rejectWithValue}) => {
    try {
        const response = await contactAPI.get("/contacts");
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, {rejectWithValue}) => { 
    try {
        const response = await contactAPI.post("/contacts", contact);
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, {rejectWithValue}) => { 
    try {
        const response = await contactAPI.delete(`/contacts/${contactId}`);
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const updateContact = createAsyncThunk("contacts/updateContact", async ({ contactId, contact }, { rejectWithValue }) => { 
    try {
        const response = await contactAPI.patch(`/contacts/${contactId}`, contact);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

