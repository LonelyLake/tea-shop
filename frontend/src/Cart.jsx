import { Link } from "react-router-dom";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Ваша корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.name} - {item.price} руб.
              </li>
            ))}
          </ul>
          <h4>Итого: {total} руб.</h4>
          <button className="btn btn-danger mt-3">
            Оформить заказ
          </button>
        </div>
      )}
      <Link to="/" className="btn btn-secondary mt-3">
        Вернуться к покупкам
      </Link>
    </div>
  );
}