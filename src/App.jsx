import React from 'react';
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from './pages/Product';
import ProductList from "./pages/ProductList";
import Success from './pages/Success';
import {useSelector} from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,

} from "react-router-dom";

const App = () => {
  const user = useSelector((state)=>state.user.currentUser)
  return (
    <Router>
    <Routes>
      <Route  path="/" element={<Home/>} exact />
      <Route  path="/cart" element={<Cart/>} />
      <Route  path="/success" element={<Success/>} />
      <Route  path="/login" element={user? <Navigate to="/"/>:<Login/>} />
      <Route  path="/register" element={user? <Navigate to="/"/>:<Register/>}  />
      <Route  path="/product/:id" element={<Product/>}  />
      <Route  path="/products/:category" element={<ProductList/>} />
  
    </Routes>
  </Router>
  )
}

export default App