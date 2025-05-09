import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <div className="container mt-4">
        <h1 className="mb-4">Магазин чая</h1>
        <Routes>
          <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;