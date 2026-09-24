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
    }
})

const adminreducer = AdminSlice.reducer


export default adminreducer