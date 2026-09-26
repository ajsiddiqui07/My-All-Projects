import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
console.log("adminslice");
const token = JSON.parse(localStorage.getItem("tokens"))
export const getuserlist = createAsyncThunk(
    "getuserlist",
    async (_, { rejectWithValue }) => {
        

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/users/",
                {
                    headers: {
                        Authorization: `Bearer ${token.access}`
                    }
                }
            );

            console.log("userlist", res.data);

            return res.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const deleteuser = createAsyncThunk(
    "deleteuser",
    async (id, { rejectWithValue }) => {
        

        try {

            const res = await axios.delete(
                `http://127.0.0.1:8000/api/users/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access}`
                    }
                }
            );

            console.log("userlist", res.data);

            return res.data;

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.message);
        }
    }
);


const AdminSlice = createSlice({
    name:'admin',
    initialState:{
        userlist:null,
        adminloader:null,
        adminMsg:null,
        adminError:null,

    },

    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(getuserlist.pending,(state,action)=>{
            state.adminloader="Loanding...";
            state.adminMsg=null;
        })
        .addCase(getuserlist.fulfilled,(state,action)=>{
            state.adminloader=null;
            state.userlist=action.payload
            
        })
        .addCase(getuserlist.rejected,(state,action)=>{
            state.adminloader=null;
            state.adminError=action.payload
        })
        .addCase(deleteuser.pending,(state,action)=>{
           
            state.adminMsg=null;
        })
        .addCase(deleteuser.fulfilled,(state,action)=>{
            state.adminMsg="User Deleted";
            
        })
        .addCase(deleteuser.rejected,(state,action)=>{
            state.adminError=action.payload
        })
    }
})

const adminreducer = AdminSlice.reducer


export default adminreducer