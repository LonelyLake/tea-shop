import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [teas, setTeas] = useState([]);
  const [cart, setCart] = useState([]);

  // Загрузка товаров с бекенда
  useEffect(() => {
    axios.get("http://localhost:5000/api/teas")
      .then(response => setTeas(response.data))
      .catch(error => console.error("Ошибка загрузки:", error));
  }, []);

  // Добавление товара в корзину
  const addToCart = (tea) => {
    setCart([...cart, tea]);
    alert(`${tea.name} добавлен в корзину!`);
  };

  return (
    <div>
      <h2 className="mb-4">Наши чаи</h2>
      <div className="row">
        {teas.map(tea => (
          <div key={tea.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{tea.name}</h5>
                <p className="card-text">{tea.price} руб.</p>
                <button 
                  onClick={() => addToCart(tea)}
                  className="btn btn-primary"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" className="btn btn-success mt-3">
        Корзина ({cart.length})
      </Link>
    </div>
  );
}