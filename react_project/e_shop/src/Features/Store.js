import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authreduser from "./authSlice";
import Catreducer from "./CategorySlice";
import productreducer from "./ProductSlice";
import adminreducer from "./AdminSlice";
import userreducer from "./UserRegisterSlice";
import cartreducer from "./CartSlice";


const appReducer = combineReducers({
    auth: authreduser,
    cart: cartreducer,
    products: productreducer,
    categories:Catreducer,
    admin:adminreducer,
    user:userreducer
});

const rootReducer = (state, action) => {

    if (action.type === "auth/logout") {
        state = undefined;
    }

    return appReducer(state, action);
};
const store = configureStore({
    reducer: rootReducer
})

export default store