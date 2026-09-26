import { configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";
import Catreducer from "./CategorySlice";
import productreducer from "./ProductSlice";
import adminreducer from "./AdminSlice";
import userreducer from "./UserRegisterSlice";


const store = configureStore({
    reducer:{
        'auth':authreduser,
        'categories':Catreducer,
        'products':productreducer,
        'admin':adminreducer,
        'user':userreducer,
    }
})

export default store