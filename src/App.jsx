import { useState } from "react";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import About from "./components/About";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import AboutUs from "./components/About";
import React from "react";
import Contact from "./pages/Contact";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
        <Route 
          path="/checkout" 
          element={<Checkout cart={cart} setCart={setCart} />} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;