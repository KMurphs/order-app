import React from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext(); //returns Provider and Consumer


class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      products: [],
      detailProduct: detailProduct,
      cart: [],
      isModalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
     }
  }
  setProducts = () => {
    let _products = [];
    storeProducts.forEach(item => {
      const _item = {...item}
      _products = [..._products, _item]
    })
    this.setState(()=>{
      return {products: _products}
    })
  }
  componentDidMount() {
    this.setProducts();
  }
  handleDetail = (id) => {
    console.log('Hello From Detail')
    this.setState(()=>{
      return {
        detailProduct: this.getItem(id)
      }
    })
  }
  addToCart = (id) => {
    console.log(`Adding item with id ${id} to Cart`)
    let _products = [...this.state.products];
    const index = _products.indexOf(this.getItem(id));
    const product = _products[index]
    product.inCart = true
    product.count += 1
    product.total += product.price

    this.setState(() => {
        return {
          products: _products,
          cart: [...this.state.cart, product]
        }
      },
      () => {
        console.log(index)
        console.log(this.state)
        this.addTotal();
      }
    )
  }
  openModal = (id) => {
    this.setState(() => {
      return {
        modalProduct: this.getItem(id),
        isModalOpen: true,
      }
    })
  }
  closeModal = () => {
    this.setState(() => {
      return {
        isModalOpen: false,
      }
    })
  }
  getItem = (id) => this.state.products.find(item => item.id === id)
  increment = (id)=>{
    let tempCart = [...this.state.cart]
    let selectedProduct = tempCart.find(item => item.id === id)
    let selectedProductIdx = tempCart.indexOf(selectedProduct)
    let product = tempCart[selectedProductIdx]

    product.count += 1 
    product.total = product.count * product.price

    this.setState(()=>{
      return {
        cart: [...tempCart],
      }
    }, ()=>{
      this.addTotal()
    })

    console.log(`Quantity of product with id ${id} has been incremented by 1`)
  }
  decrement = (id)=>{
    let tempCart = [...this.state.cart]
    let selectedProduct = tempCart.find(item => item.id === id)
    let selectedProductIdx = tempCart.indexOf(selectedProduct)
    let product = tempCart[selectedProductIdx]

    product.count -= 1 
    if(product.count < 0){
      this.removeItem(id)
    }else{
      product.total = product.count * product.price
      this.setState(()=>{
        return {
          cart: [...tempCart],
        }
      }, ()=>{
        this.addTotal()
      })
    }

    console.log(`Quantity of product with id ${id} has been decremented by 1`)
  }
  removeItem = (id)=>{
    console.log(`Item with id ${id} has been removed`)
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]

    tempCart = tempCart.filter(item => item.id !== id)
    tempProducts[tempProducts.indexOf(this.getItem(id))].inCart = false
    tempProducts[tempProducts.indexOf(this.getItem(id))].count = 0
    tempProducts[tempProducts.indexOf(this.getItem(id))].total = 0

    this.setState(()=>{
      return {
        cart: [...tempCart],
        Products: [...tempProducts], 
      }
    })
  }
  clearCart = (id)=>{
    console.log(`Cart has been cleared`)
    this.state.cart.forEach(item => {
      item.inCart = false;
      item.count = 0;
      item.total = 0
    })
    this.setState(()=>{
      return {
        cart: [],
      }
    },() => {
      this.setProducts()
      this.addTotal()
    })
  }
  addTotal = () => {
    let subTotal = this.state.cart.reduce((accumulator, item) => accumulator + item.total, 0)
    console.log(subTotal)
    const tax = parseFloat((subTotal*0.1).toFixed(2))
    this.setState(()=>{
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: subTotal+tax
      }
    })
  }
  render() { 
    return (  
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer};