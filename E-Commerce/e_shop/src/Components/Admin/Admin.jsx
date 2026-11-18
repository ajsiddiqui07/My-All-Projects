import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../../Features/authSlice";
import { toast } from "react-toastify";
import Adminsidebar from "../Templates/Adminsidebar";
import Admindashbord from "./Admindashbord";
import Categories from "../Categories/Categorise";
import CreateCategory from "../Categories/Createcategories";
import EditCategories from "../Categories/Editcategories";
import Products from "../Product/Products";
import CreateProduct from "../Product/Createproduct";
import EditProduct from "../Product/EditProduct";
import Userslist from "./userlist";


function Admin() {
  const admindata = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()



  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 font-sans flex">
      {/* ================= SIDEBAR ================= */}
      <Adminsidebar />
      {/* ================= MAIN ================= */}
      <div className=" ml-70 mt-15">
        <Routes>
          <Route path="/" element={<Admindashbord />}></Route>
          <Route path="/category" element={<Categories />}></Route>
          <Route path="/createcategory" element={<CreateCategory/>}></Route>
          <Route path="/editcategories/:id" element={<EditCategories/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/createproduct" element={<CreateProduct/>}></Route>
          <Route path="/editproduct/:id" element={<EditProduct/>}></Route>
          <Route path="/userlist" element={<Userslist/>}></Route>


        </Routes>
      </div>

    </div>
  );
}

export default Admin;