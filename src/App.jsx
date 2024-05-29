import React from "react";
//import './App.css'
import HomePage from "./LandigPage/Home/HomePage";
import "./../node_modules/bulma/css/bulma.css";
import Navbar from "./LandigPage/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <HomePage></HomePage>
    </>
  );
}

export default App;
