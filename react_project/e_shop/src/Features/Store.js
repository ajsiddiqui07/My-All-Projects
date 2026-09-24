import { configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";
import Catreducer from "./CategorySlice";
import productreducer from "./ProductSlice";
import adminreducer from "./AdminSlice";


const store = configureStore({
    reducer:{
        'auth':authreduser,
        'categories':Catreducer,
        'products':productreducer,
        'admin':adminreducer,
    }
})

export default store