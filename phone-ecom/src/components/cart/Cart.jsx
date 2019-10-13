import React from 'react';
// import "./Cart.css"
import {ProductConsumer} from '../../Context'
import Title from '../Title'
import CartColumns from './CartColumns'
import CartList from './CartList'
import CartTotals from './CartTotals'
import EmptyCart from './EmptyCart'



class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <section>
        <ProductConsumer>
          {value => {
            const {cart} = value;
            return (
              cart.length === 0
              ? <EmptyCart />
              : (
                <React.Fragment>
                  <Title name="Your" title="Cart"></Title>
                  <CartColumns/>
                  <CartList value={value}/>
                  <CartTotals value={value} history={this.props.history}/>
                </React.Fragment>
              )
            )
          }}
        </ProductConsumer>

        
      </section>
    );
  }
}
 
export default Cart;