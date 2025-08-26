import React, { useState } from 'react';
import './Women.css';
import { API_BASE_URL } from '../../config';

const Women = (props) => {
  const [orderdata, setorderdata] = useState({
    email: '',
    image: '',
    price: '',
  });

  const {
    title,
    image1, image2, image3, image4, image5, image6,
    price1, price2, price3, price4, price5, price6
  } = props.ladies;

  const images = [image1, image2, image3, image4, image5, image6];
  const prices = [price1, price2, price3, price4, price5, price6];

  const handleOrderNow = async (index) => {
    const imgElement = document.getElementById(`women-image-${index + 1}`);
    const priceElement = document.getElementById(`price-${index}`);

    const imageSrc = imgElement ? imgElement.src : '';
    const priceValue = priceElement ? priceElement.textContent : '';
    console.log('Price:', priceValue);
    console.log('Image Source:', imageSrc);
    console.log('Email from sessionStorage:', sessionStorage.getItem('key'));

    const newOrder = {
      email: sessionStorage.getItem('key'),
      image: imageSrc,
      price: priceValue,
    };
    setorderdata(newOrder);

    try {
      const response = await fetch(`${API_BASE_URL}/api/orderdetails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        alert('Order Placed Successfully!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order.');
    }
  };

  return (
    <div className='womenSection'>
      <h2>{title}</h2>
      <img src='assets/LadiesBanner.gif' alt='Banner' />
      <div className='womenImages'>
        {images.map((img, index) => (
          <div key={index} className='imageBox'>
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              id={`women-image-${index + 1}`}
            />
            <div className='overlay' id={`price-${index}`}>
              {prices[index]}
            </div>
            <button onClick={() => handleOrderNow(index)}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
