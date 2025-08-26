import React from 'react'
import './Collection.css'
import { API_BASE_URL } from '../../config';

const Collection = (props) => {
    const{title,image1,image2,image3,image4,image5,image6,price1,price2,price3,price4,price5,price6} = props.gents;
    const images=[image1,image2,image3,image4,image5,image6];
    const price=[price1,price2,price3,price4,price5,price6];
    const handleOrderNow=async(index)=>{
        const imgElement = document.getElementById(`image-${index+1}`);
        const priceElement = document.getElementById(`price-${index}`);

        const imageSrc = imgElement ? imgElement.src : '';
        const priceValue = priceElement ? priceElement.textContent : '';
        console.log('Price:', priceValue);
        console.log('Image Source:', imageSrc);
        console.log('Email from sessionStorage:', sessionStorage.getItem('key'));

        const orderdata = {
            email: sessionStorage.getItem('key'),
            image: imageSrc,
            price: priceValue
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/orderdetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderdata)
            });

            if (response.ok) {
                alert('Order Placed Successfully! Vist cart');
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order.');
        }
    }
  return (
    <div className='collectionSection'>
      <h2>{title}</h2>
      <div className='menImages'>
        {images.map((img,index)=>(
          <div key={index} className='imageBox'>
            <img src={img} alt={`${title} ${index+1}`} id={`image-${index+1}`} />
            <div className='overlay'>{price[index]}</div>
            <button onClick={() => handleOrderNow(index)}>OrderNow</button>
            </div>
        ))}
      </div>
    </div>
  )

}
export default Collection
