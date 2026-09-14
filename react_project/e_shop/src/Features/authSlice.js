import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken:null,
        refreshToken:null,
        userdetail:null,
    },

    reducers:{
        setCredentials:(state,action)=>{
            state.accessToken=action.payload.accessToken;
            state.refreshToken=action.payload.refreshToken;
            state.userdetail=action.payload.userdetail;
        },
        
        logout:(state,action)=>{
            state.accessToken=null;
            state.refreshToken=null;
            state.userdetail=null;
        }
    },

})

export const { setCredentials, logout } = authSlice.actions;
const authreduser = authSlice.reducer;

export default authreduser