
import React from 'react';
// import "./CartItem.css"


export default function CartItem({item, value}){
  const {id, title, img, price, total, count} = item;
  const {increment, decrement, removeItem} = value;

  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img src={img} alt="product" style={{width: '5rem',}} className="img-fluid"/>
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">Product: </span>{title}
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <strong><span className="d-lg-none">Price: </span>${price}</strong>
      </div>

      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
          <span className="btn btn-black mx-1">{count}</span>
          <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
        </div>
      </div>

      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>

      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <strong>Total Price: ${total}</strong>
      </div>


    </div>
  )
}