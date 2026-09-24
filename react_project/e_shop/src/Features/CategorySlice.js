import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("tokens"))


export const getcategories = createAsyncThunk('getcategories',async()=>{
       

    try {
         const res = await axios.get("http://127.0.0.1:8000/api/categories/",{
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

export const CreateCategories = createAsyncThunk('CreateCategories',async(data,registrAPI)=>{
        
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/categories/",data,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
        const catdata = res.data
        
        return catdata
         
    } catch (error) {
          console.log(error);  
          return registrAPI.rejectWithValue(error.response?.data || error.message)
    }
})

export const Deletecategories = createAsyncThunk("Deletecategories",async(id,APIError)=>{
    try {
        
        const res = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })

        return id
    } catch (error) {
        console.log(error.response?.data);
        return APIError.rejectWithValue(error.message)
        
    }
})


export const Editcategories = createAsyncThunk("Editcategories",async(id,APIError)=>{
    
    
    try {
        
        const res = await axios.get(`http://127.0.0.1:8000/api/categories/${id}/`,{
            headers:{
                Authorization:`Bearer ${token.access}`
            }
        })
        const catdata = res.data
      
      
        return catdata
    } catch (error) {
        console.log(error.response?.data);
        return APIError.rejectWithValue(error.response?.data || error.message)
        
    }
})


export const Updatecategories = createAsyncThunk('Updatecategories',async({id,data},APIError)=>{
       
    try {
         const res = await axios.patch(`http://127.0.0.1:8000/api/categories/${id}/`,data,{
            headers:{
                Authorization : `Bearer ${token.access}`
            }
         })
         const catdata = res.data
            
         return catdata
        
         

    } catch (error) {
       console.log(error.response?.data);

            return APIError.rejectWithValue(
                error.response?.data || error.message
            );
    }
})

const CategorySlice = createSlice({
    name:"category",
    initialState:{
        catArray:null,
        singledata:{},
        catMsg:null,
        catError:null,
        catLoader:false,
    },

    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(getcategories.pending,(state,action)=>{
            state.catLoader="Loding...";
            state.catError=null;
            state.catMsg=null;
        })
        .addCase(getcategories.fulfilled,(state,action)=>{
            state.catLoader=false;
            state.catArray=action.payload;
            
        })
        .addCase(getcategories.rejected,(state,action)=>{
            state.catLoader=false;
            state.catError=action.payload;

        })
        .addCase(CreateCategories.pending,(state,action)=>{
            state.catLoader="Loding...";
            state.catError=null;
            state.catMsg=null;
        })
        .addCase(CreateCategories.fulfilled,(state,action)=>{
            state.catLoader=null;
            state.catArray.push(action.payload)
            state.catMsg = "Category created successfully";
        })
        .addCase(CreateCategories.rejected,(state,action)=>{
            state.catLoader=false;
            state.catError=action.payload
        })
        .addCase(Deletecategories.pending,(state,action)=>{
            // state.catLoader="Loding...";
            state.catError=null;
            state.catMsg=null;
        })
        .addCase(Deletecategories.fulfilled,(state,action)=>{
            state.catLoader=null;
            state.catMsg = "Category deleted successfully";
        })
        .addCase(Deletecategories.rejected,(state,action)=>{
            state.catLoader=false;
            state.catError=action.payload
        })
        .addCase(Editcategories.pending,(state,action)=>{
            state.catLoader="Loding...";
            state.catError=null;
            state.catMsg=null;
             state.singledata=null;
        })
        .addCase(Editcategories.fulfilled,(state,action)=>{
            state.catLoader=null;
            state.singledata=action.payload
           
        })
        .addCase(Editcategories.rejected,(state,action)=>{
            state.catLoader=false;
            state.catError=action.payload
        })
        .addCase(Updatecategories.pending,(state,action)=>{
            state.catLoader="Loding...";
            state.catError=null;
            state.catMsg=null;
            
        })
        .addCase(Updatecategories.fulfilled,(state,action)=>{
            state.catLoader=null;
            state.catMsg="data updated"
           
        })
        .addCase(Updatecategories.rejected,(state,action)=>{
            state.catLoader=false;
            state.catError=action.payload
        })

    }

})

 const Catreducer = CategorySlice.reducer

 export default Catreducer