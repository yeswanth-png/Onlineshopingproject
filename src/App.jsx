import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shoppingfolder/container/Header";
import MainPage from "./shoppingfolder/pages/MainPage";
import Signin from "./shoppingfolder/container/Signin";
import Signup from "./shoppingfolder/container/Signup";
import Mainpage1 from "./shoppingfolder/pages/Mainpage1";
import Cart from "./shoppingfolder/container/Cart";

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Mainpages" element={<Mainpage1 />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
