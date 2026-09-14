import { configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";

const store = configureStore({
    reducer:{
        'auth':authreduser
    }
})

export default store