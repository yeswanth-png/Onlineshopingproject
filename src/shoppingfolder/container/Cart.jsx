import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const email = sessionStorage.getItem('key');
  const navigate = useNavigate();

  console.log('Email from sessionStorage:', email);
      const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/cart?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        setCartData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

  useEffect(() => {

    if (email) {
      fetchCartData();
    }
  }, [email]);

  const total = cartData.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + (price * qty);
  }, 0);

  const handleGoHome = () => {
    navigate('/Mainpages');
  };
  const handleUnorder = async (itemId) => {
      const response = await fetch(`http://localhost:8081/api/orderdelete?id=${itemId}`, {
        method: 'DELETE',
      });
        if(response.ok){
         
      alert('Item removed from cart');
       fetchCartData();
    }
  }

  return (
    <div className="cart-container">
      {/* Cart and Home buttons side-by-side */}
      <div className="cart-header-buttons">
        <label htmlFor="cart-toggle" className="cart-button">🛒 Cart</label>
        <button onClick={handleGoHome} className="home-button">🏠 Home</button>
      </div>

      {/* Hidden checkbox toggle for sidebar */}
      <input type="checkbox" id="cart-toggle" className="cart-toggle" />

      <div className="cart-sidebar">
        <label htmlFor="cart-toggle" className="close-btn">×</label>
        <h2>Your Cart</h2>
        <ul className="cart-items">
          {cartData.length === 0 ? (
            <li>Your cart is empty.</li>
          ) : (
            cartData.map((item, index) => (
              <li key={index}>
                ₹{item.price} x {item.qty || 1}
              </li>
            ))
          )}
        </ul>
        <p className="cart-total">Total: ₹{total}</p>
      </div>

      <div className="main-content">
        <h1>Ordered Items</h1>
        <ul className="ordered-list">
          {cartData.map((item, index) => (
            <li key={index} className="ordered-item">
              <img
                src={item.image || 'https://via.placeholder.com/80'}
                alt={`Product ${index + 1}`}
                className="cart-image"
              />
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.qty || 1}</p>
                <p>Subtotal: ₹{item.price * (item.qty || 1)}</p>
                <button className="buy-now-button" onClick={() => handleUnorder(item.id)}>Unorder</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
