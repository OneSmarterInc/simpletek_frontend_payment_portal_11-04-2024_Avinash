import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import PrivateRoute from "../Components/PrivateRoute";
import Home from "../Components/Home";
import PaymentSidebar from "../Components/PaymentSidebar";

const MainRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<PaymentSidebar/>} />
      {/* </Route> */}
      {/* Note: Later make authentecations in Protected Routes */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="*" element={<h3>Page Not Found</h3>} />
    </Routes>
  );
};

export default MainRoutes;
