import React from 'react';
// import "./Details.css"
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../Context';
import {ButtonContainer} from './Button';


class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return ( 
      <ProductConsumer>
        {(value) => {
          const {id, company, img, info, price, title, inCart} = value.detailProduct;
          return (
            <div className="container py-5">
              <div className="row col-10 text-center mx-auto text-blue my-5 text-slanted">
                <h1>{title}</h1>
              </div>

              <div className="row">
                <div className="col-10 mx-auto col-md-6 text-capitalize my-3">
                  <img src={img} alt="product" className="img-fluid"/>
                </div>
                <div className="col-10 mx-auto col-md-6 text-capitalize my-3">
                  <h2>Model: {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    Made By: <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      Price: <span>$</span>{price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Some Info About The Product:
                  </p>
                  <p className="text-muted lead">
                    {info}
                  </p>
                  <Link to="/">
                    <ButtonContainer>Back to Products</ButtonContainer>
                  </Link>
                  <ButtonContainer cart
                                    disabled={inCart}
                                    onClick={() => {
                                      value.addToCart(id);
                                      value.openModal(id);
                                    }}>
                    {inCart ? 'In Cart' : 'Add To Cart'}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    );
  }
}


export default Details;