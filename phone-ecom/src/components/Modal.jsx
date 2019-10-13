import React from 'react';
// import "./Modal.css"
import styled from 'styled-components'
import {ProductConsumer} from '../Context'
import {ButtonContainer} from './Button'
import {Link} from 'react-router-dom'


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <ProductConsumer>
      {value => {
  
        const {isModalOpen, closeModal} = value
        const {img, title, price} = value.modalProduct
  
        return (
          !isModalOpen 
          ? null
          : (
            <ModalContainer>
              <div className="container">
                <div className="row">
                  <div id="modal" className="col-8 p-5 mx-auto col-md-6 col-lg-4 text-cetner text-capitalize">
                    <h5>Item Added To the Cart</h5>
                    <img src={img} alt="product" className="img-fluid"/>
                    <h5>{title}</h5>
                    <h5 className="text-muted">Price: ${price}</h5>
                    <Link to='/'>
                      <ButtonContainer onClick={() => {closeModal()}}>
                        Store
                      </ButtonContainer>
                    </Link>
                    <Link to='/cart'>
                      <ButtonContainer onClick={() => {closeModal()}} cart>
                        Go to the Cart
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </ModalContainer>
          )
          )
      }}
      </ProductConsumer>
    )
  } 
}
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal{
    background: var(--mainWhite);
  }
`
export default Modal;