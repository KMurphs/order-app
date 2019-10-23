
import React from 'react';
// import "./CartList.css"
import CartItem from "./CartItem"


export default function CartList({value}){
  return (
    <div className="container-fluid">
      {value.cart.map(item => {
        return <CartItem key={item.id} 
                          item={item}
                          value={value}/>
      })}
    </div>
  )
}