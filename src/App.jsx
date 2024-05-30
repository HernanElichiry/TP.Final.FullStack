import React from "react";
//import './App.css'

import HomePage from "./LandigPage/Home/HomePage";
import "./../node_modules/bulma/css/bulma.css";
import Navbar from "./LandigPage/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LandigPage/Login/login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="LogIn" element={<LoginForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
