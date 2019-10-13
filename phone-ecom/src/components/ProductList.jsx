import React from 'react';
import Title from './Title';
import Product from './Product';
// import "./ProductList.css"

import {ProductConsumer} from "../Context"


class ProductList extends React.Component {
  render() { 
    return ( 
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name='our' title='products'/>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map(product => {
                    return <Product product={product} 
                                    key={product.id}/>
                  })
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
 
export default ProductList;