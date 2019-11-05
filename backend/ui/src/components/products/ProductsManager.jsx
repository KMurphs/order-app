import React, {useState} from 'react';


import {reduxGetProducts, reduxGetSuppliers} from '../../datastore';
import ProductList from '../products/ProductList';
import ProductForm from '../Form/ProductForm/ProductForm';



const ProductManager = (props) => {



  // Initialize variables
  const [isProductListRetrieved, setIsProductListRetrieved] = useState(false)
  const [productFormData, setProductFormData] = useState({
                                                          id: -1,
                                                          name: '',
                                                          category: '',
                                                          subcategory: '',
                                                          pref_supplier_id: -1,
                                                          alias: '',
                                                          product_suppliers: [],
                                                          prefered_supplier: {},
                                                          product_tags: [],
                                                          product_images: []
                                                        })


  

  // Get Product List if not already present 
  if(!isProductListRetrieved){
    reduxGetProducts()
    .then((res)=>setIsProductListRetrieved(true)) // Force a re-render with retrieved Product data
      
    reduxGetSuppliers() // Just ensures that when we need it, the suppliers are already loaded from the backend
  }


  


  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        <ProductList list={reduxGetProducts() || {}} onSelectionChange={newSelectedProduct => setProductFormData(newSelectedProduct)}/>
        <ProductForm formData={productFormData} 
                     appIsOnline={props.isOnline} 
                     onGetSuppliersLike={(value)=>Object.values(reduxGetSuppliers()).map(item => getSupplierDisplayNames(item.surname, item.firstnames, item.storename))} 
                     onSubmit={()=>{ setIsProductListRetrieved(false); window.location.reload();}}/>
      </React.Fragment>
    </div>
  );
}
 
export default ProductManager;

const getSupplierDisplayNames = (surname, firstnames, storename) => {
  let displayName = ''

  if(surname)displayName = `${displayName}${surname} `
  if(firstnames)displayName = `${displayName}${firstnames} `

  if(surname || firstnames){
    if(storename)displayName = `${displayName}${firstnames} - (${storename})`
  }else{
    if(storename)displayName = `${storename}`
  }
  
  return displayName
}