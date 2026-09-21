import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import axios from "axios";

export const Registeruser = createAsyncThunk("Registeruser",async(logindata,registrAPI)=>{
    try {
        const res = await axios("http://127.0.0.1:8000/api/users/",logindata)
        const reguser = res.data
        return reguser
        
    } catch (error) {
        return registrAPI.rejectWithValue({
            error:error.res
        })
    }
})

const userregisterSlice = createSlice({
    name:"userRegister",
    initialState:{
        
        registerDetail:null,
        loading: null,
        error: null,
    
    },

    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(Registeruser.loading,(state,action)=>{
            state.loading="Loading...";
            state.error=null;

        })
        .addCase(Registeruser.fulfilled,(state,action)=>{
            state.loading=null;
            state.registerDetail=action.payload;
            
        })
        .addCase(Registeruser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})