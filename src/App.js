import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommercePage from "./EcommercePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <EcommercePage />
      <Footer />
    </>
  );
};

export default App;
