import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = "https://6815fb6532debfe95dbd0555.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get("/contacts");
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, {rejectWithValue}) => { 
    try {
        const response = await axios.post("/contacts", contact);
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, {rejectWithValue}) => { 
    try {
        const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

