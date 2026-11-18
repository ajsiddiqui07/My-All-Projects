import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addCart = createAsyncThunk("addCart",async(data)=>{
    const token = JSON.parse(localStorage.getItem("tokens"))
    
    try {
        
        const res = await axios.post("http://127.0.0.1:8000/api/carts/add-item/",data,{
             headers:{
                Authorization : `Bearer ${token.access}`
            }

        })

        
    } catch (error) {
            return error.message
        
    }
}) 


export const getCart = createAsyncThunk("getCart",async()=>{
    const token = JSON.parse(localStorage.getItem("tokens"))
   
    
    try {
        
        const res = await axios.get("http://127.0.0.1:8000/api/carts/my-cart/",{
             headers:{
                Authorization : `Bearer ${token.access}`
            }
           
            
        })
        
        return res.data
        
    } catch (error) {
        return error.message
  
        
        
    }
}) 


export const removecart = createAsyncThunk("removecart",async(data)=>{
    const token = JSON.parse(localStorage.getItem("tokens"))
    console.log("remove item");
    
    try {
        
        const res = await axios.post(`http://127.0.0.1:8000/api/carts/remove-item/`,data,{
             headers:{
                Authorization : `Bearer ${token.access}`
            }
        })
            console.log(res.data);

        
    } catch (error) {
        
        console.log(error.message);
        
    }
}) 


const CartSlice = createSlice({
    name:"product",
    initialState:{
        cartArray:null,
        cartMsg:null,
        cartError:null,
        cartLoader:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(addCart.pending,(state,action)=>{
            state.cartLoader=true
            state.cartMsg=null
        }).addCase(addCart.fulfilled,(state,action)=>{
            state.cartLoader=false
            state.cartMsg=true
        }).addCase(addCart.rejected,(state,action)=>{
            state.cartLoader=false
            state.cartError=action.payload
        }).addCase(getCart.pending,(state,action)=>{
            state.cartLoader=true
            state.cartMsg=null
        }).addCase(getCart.fulfilled,(state,action)=>{
            state.cartLoader=false
            state.cartArray=action.payload
            state.cartMsg=true
        }).addCase(getCart.rejected,(state,action)=>{
            state.cartLoader=false
            state.cartError=action.payload
        }).addCase(removecart.pending,(state,action)=>{
            state.cartLoader=true
            state.cartMsg=null
        }).addCase(removecart.fulfilled,(state,action)=>{
            state.cartLoader=false
            state.cartMsg=true
        }).addCase(removecart.rejected,(state,action)=>{
            state.cartLoader=false
            state.cartError=action.payload
        })

    }
})

const cartreducer = CartSlice.reducer

export default cartreducer