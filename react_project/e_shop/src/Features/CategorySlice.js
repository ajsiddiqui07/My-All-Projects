import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getcategories = createAsyncThunk('getcategories',async()=>{
   const token = JSON.parse(localStorage.getItem("tokens"))

    try {
         const res = await axios.get("http://127.0.0.1:8000/api/categories",{
            headers:{
                Authorization : `Bearer ${token.access}`
            }
         })
         const catdata = res.data
            
         return catdata
        
         

    } catch (error) {
        console.log(error);
        return error.message
    }
})




const CategorySlice = createSlice({
    name:"category",
    initialState:{
        catArray:null,
        catMsg:null,
        catError:null,
        catLoader:null,
    },

    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(getcategories.pending,(state,action)=>{
            state.catLoader="Loding...";
            state.catError=null;
        })
        .addCase(getcategories.fulfilled,(state,action)=>{
            state.catLoader=null;
            state.catArray=action.payload;
            state.catMsg="access successfull";
        })
        .addCase(getcategories.rejected,(state,action)=>{
            state.catLoader=null;
            state.catError=action.payload;

        })

    }

})

 const Catreducer = CategorySlice.reducer

 export default Catreducer