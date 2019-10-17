import React from 'react';
import SupplierForm from './SupplierForm';
import ProductForm from '../products/ProductForm';
import ClientForm from '../clients/ClientForm';

const SupplierManager = (props) => {
  return ( 
    <div className="container-fluid container-page">
      <React.Fragment>
        <ProductForm/>
        <SupplierForm/>
        <ClientForm/>
      </React.Fragment>
    </div>
  );
}
 
export default SupplierManager;