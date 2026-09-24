import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("tokens"))
export const createproduct = createAsyncThunk('createproduct',async(data,proAPI)=>{
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/products/",data,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return proAPI.rejectWithValue(
            error.response?.data || error.message
        )
    
    }
})

export const getproduct = createAsyncThunk('getproduct',async(proAPI)=>{
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/",{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return proAPI.rejectWithValue(
            error.response?.data || error.message
        )
    
    }
})

export const deleteproduct=createAsyncThunk('deleteproduct',async(id,proError)=>{
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
    } catch (error) {
         console.log(error);
        return proError.rejectWithValue(
            error.response?.data || error.message
        )
    }
})

export const editproduct = createAsyncThunk('editproduct',async(id,proEror)=>{
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })

        return res.data
    } catch (error) {
        console.log(error);
        return proEror.rejectWithValue(error.message)
        
    }
})

export const updateproduct = createAsyncThunk('updateproduct',async({id,data},proError)=>{
    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/products/${id}/`,data,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
        
        
    } catch (error) {
        console.log(error);
        return proError.rejectWithValue(error.message)
        
    }
})

const Productslice = createSlice({
    name:'product',
    initialState:{
        productArray:null,
        singledata:{},
        productMsg:null,
        productError:null,
        productLoader:false,
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createproduct.pending,(state,action)=>{
            state.productLoader="Loading";
            state.productMsg=null;
        })
        .addCase(createproduct.fulfilled,(state,action)=>{
            state.productLoader=null;
            state.productMsg="Product created";

        })
        .addCase(createproduct.rejected,(state,action)=>{
            state.productLoader=null;
            state.productError=action.payload;
        })
        .addCase(getproduct.pending,(state,action)=>{
            state.productLoader="Loading";
            state.productMsg=null;
        })
        .addCase(getproduct.fulfilled,(state,action)=>{
            state.productLoader=null;
            state.productArray=action.payload;
            

        })
        .addCase(getproduct.rejected,(state,action)=>{
            state.productLoader=null;
            state.productError=action.payload;
        })
        .addCase(deleteproduct.pending,(state,action)=>{
            state.productLoader="Loading";
            state.productMsg=null;
        })
        .addCase(deleteproduct.fulfilled,(state,action)=>{
            state.productLoader=null;
            state.productMsg="product deleted";
            
        })
        .addCase(deleteproduct.rejected,(state,action)=>{
            state.productLoader=null;
            state.productError=action.payload;
        })
        .addCase(editproduct.pending,(state,action)=>{
            state.productLoader="Loading";
            state.productMsg=null;
        })
        .addCase(editproduct.fulfilled,(state,action)=>{
            state.productLoader=null;
            state.singledata=action.payload
           
            
        })
        .addCase(editproduct.rejected,(state,action)=>{
            state.productLoader=null;
            state.productError=action.payload;
        })
        .addCase(updateproduct.pending,(state,action)=>{
            state.productLoader="Loading";
            state.productMsg=null;
        })
        .addCase(updateproduct.fulfilled,(state,action)=>{
            state.productLoader=null;
            state.productMsg="Product Updated";
           
            
        })
        .addCase(updateproduct.rejected,(state,action)=>{
            state.productLoader=null;
            state.productError=action.payload;
        })

    }
})

const productreducer = Productslice.reducer

export default productreducer