import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import axios from "axios";

export const Registeruser = createAsyncThunk("Registeruser",async(logindata,registrAPI)=>{
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/users/",logindata)
        const reguser = res.data
        return reguser
        
    } catch (error) {
        return registrAPI.rejectWithValue({
            error:error.response?.data
        })
    }
})

const userregisterSlice = createSlice({
    name:"userRegister",
    initialState:{
        
        registerDetail:null,
        Msg:null,
        loading: null,
        error: null,
    
    },

    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(Registeruser.pending,(state,action)=>{
            state.loading="Loading...";
            state.error=null;
            state.Msg=null;

        })
        .addCase(Registeruser.fulfilled,(state,action)=>{
            state.loading=null;
            state.registerDetail=action.payload;
            state.Msg="User Created"
            
        })
        .addCase(Registeruser.rejected,(state,action)=>{
            state.loading=null;
            state.error=action.payload
            state.Msg=null;
        })
    }
})

const userreducer = userregisterSlice.reducer

export default userreducer