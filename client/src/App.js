import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Markets from "./pages/Markets";
import About from "./pages/About";

//create the Links between pages
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
