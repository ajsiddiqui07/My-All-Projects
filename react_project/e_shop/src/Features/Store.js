import { configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";
import Catreducer from "./CategorySlice";
import productreducer from "./ProductSlice";


const store = configureStore({
    reducer:{
        'auth':authreduser,
        'categories':Catreducer,
        'products':productreducer
    }
})

export default store