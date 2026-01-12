import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import About from "./components/About";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import AboutUs from "./components/About";
import React from "react";
import Contact from "./pages/Contact";

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("food_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // जब भी cart update हो, localStorage में save करें
  useEffect(() => {
    localStorage.setItem("food_cart", JSON.stringify(cart));
  }, [cart]);

  // Cart को clear करने के लिए function
  const clearCart = () => {
    localStorage.removeItem("food_cart");
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/shop" 
          element={<Shop cart={cart} setCart={setCart} clearCart={clearCart} />} 
        />
        <Route 
          path="/checkout" 
          element={<Checkout cart={cart} setCart={setCart} clearCart={clearCart} />} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;