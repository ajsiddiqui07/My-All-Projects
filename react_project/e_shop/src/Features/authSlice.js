import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const loginuser = createAsyncThunk("loginuser", async (logindata,thunkAPI) => {
    

    try {
        const res = await axios.post("http://127.0.0.1:8000/api/auth/login/",logindata)
        const admin = res.data.tokens.access
        const token = res.data.tokens
        const refreshtoken =res.data.tokens.refresh
        localStorage.setItem("tokens",JSON.stringify(token));
        

        if (admin) {
            const response = await axios.get("http://127.0.0.1:8000/api/users/me/", {
                headers: {
                    Authorization: `Bearer ${admin}`
                }

            

            })
            const admindetail = response.data
          
            
            return {admindetail , admin , refreshtoken};
            

            // navigate('/admin')
        }


    } catch (error) {
        return thunkAPI.rejectWithValue({
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            fullError: error
        })
       
    }

})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        rtoken:null,
        token: null,
        user:null,
        loading: null,
        error: null,
    },

    reducers: {
        logout: (state) => {
      state.token = null;
      state.user = null;
    },
       
    },

    extraReducers:(builder)=>{
        builder.addCase(loginuser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginuser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload.admin;
            state.rtoken=action.payload.refreshtoken;
            state.user=action.payload.admindetail;
           

        })
        .addCase(loginuser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }

})

const authreduser = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authreduser