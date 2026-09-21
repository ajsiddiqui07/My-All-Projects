import { configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";
import Catreducer from "./CategorySlice";


const store = configureStore({
    reducer:{
        'auth':authreduser,
        'categories':Catreducer
    }
})

export default store