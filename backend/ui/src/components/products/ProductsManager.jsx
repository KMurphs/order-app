import React, {useState} from 'react';


import {reduxStore, reduxLoadProducts} from '../../datastore';
import ProductList from '../products/ProductList';
import ProductForm from '../products/ProductForm';



const ProductManager = (props) => {



  // Initialize variables
  const [isProductListRetrieved, setIsProductListRetrieved] = useState(false)
  const [productFormData, setProductFormData] = useState({})


  

  // Get Product List if not already present 
  if(!isProductListRetrieved){
    
    (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/api/products`, {})
    .then((res) => {
      let newRes = res.map(item => {
                            item.product_data.product_images.forEach(img => img = `${process.env.REACT_APP_BASE_URL}${img.replace(/\\\\/g,'/')}`)
                            return item.product_data
                          })
      reduxStore.dispatch(reduxLoadProducts(newRes)); // store retrieved Product data
      setIsProductListRetrieved(true); // Force a re-render with retrieved Product data
      // console.log(reduxStore.getState().products)
    })
    .catch((err) => console.log(err))

  }

  


  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        <ProductList list={reduxStore.getState().products || {}} onSelectionChange={newSelectedProduct => setProductFormData(newSelectedProduct)}/>
        <ProductForm formData={productFormData} 
                     appIsOnline={props.isOnline} 
                     onSubmit={()=>{ setIsProductListRetrieved(false); window.location.reload();}}/>
      </React.Fragment>
    </div>
  );
}
 
export default ProductManager;