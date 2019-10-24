import React, {useState} from 'react';
import './ProductList.css';


import PicturePreviewSwiper from '../PicturePreviewSwiper/PicturePreviewSwiper';

 
const ProductList = (props) => {

  const defaultPicture = '/imgs/NoImage.png'
  
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [displayedPictures, _setDisplayedPictures] = useState(Object.keys(props.list).map((item, index) => props.list[index].product_images[0] || defaultPicture))
  const setDisplayedPictures = (newDisplayedPicture, newDisplayedPictureIndex)=>{
    _setDisplayedPictures(displayedPictures.map((item,index) => index === newDisplayedPictureIndex ? newDisplayedPicture: item))
  }

  return ( 
    <div className='container product-list mt-0 mt-md-5'>
      <ul className='list-group'>
        <li className={`list-group-item list-group-item-action `} 
            onClick={()=>{setActiveItemIndex(0); props.onSelectionChange({})}}>
              <a href="#product-form" className='product-list-add-box'>
                <i className="fas fa-plus"></i>
                <span><span className='d-none d-md-inline'>Reset Form and </span>&nbsp;Add New Product Details</span>
              </a>
        </li>

        {
          Object.keys(props.list).map((item, index) => { 
            props.list[index].prefered_supplier = props.list[index].prefered_supplier || {}
            return (

              <li key={index + 1} 
                className={`list-group-item list-group-item-action product-list-item ${activeItemIndex === index+1 ? 'list-group-item-primary' : '' }`} 
                onClick={()=>{setActiveItemIndex(index + 1); props.onSelectionChange({...props.list[index]})}}>
                  
                  <a href="#product-form" className='product-list-item-linkbox'>


                    <div className='img-container'>
                      <img src={displayedPictures[index] || defaultPicture} alt={`Showing some ${props.formType}`} className="img-thumbnail"></img>
                    </div>


                    <div className='text-container'>
                      <div className='text-container__text'>
                        <span className='product-list-text-primary'>{props.list[index].name}<br/></span>
                        <span className='product-list-text-secondary d-none d-md-inline'><span className='product-list-text-disabled'>Category: </span>{props.list[index].category}&nbsp;&nbsp;</span>
                        <span className='product-list-text-secondary d-none d-md-inline'><span className='product-list-text-disabled'>Subcategory: </span>{props.list[index].subcategory}</span>
                      </div>
                      <div className='text-container__prices'>
                        <span className='product-list-text-primary product-list-text-primary--red'><span className='product-list-text-disabled'>PA: </span>{props.list[index].prefered_supplier.item_supplier_cost_usd || 0}</span>
                        <span className='product-list-text-primary product-list-text-primary--green'><span className='product-list-text-disabled'>PV: </span>{props.list[index].prefered_supplier.item_client_cost_usd || 0}</span>
                        <span className='product-list-text-secondary'><span className='product-list-text-disabled'>Shipping Days: </span>{props.list[index].prefered_supplier.item_shipping_days || 0}</span>
                      </div>
                    </div>



                    <div className="swiper-container">
                      <PicturePreviewSwiper pictures={[...props.list[index].product_images]}
                                            formHidden={{'addBtn' : true}} 
                                            onNewSelection={(selectedPicture) => setDisplayedPictures(selectedPicture, index)}
                                            onNewPicture={()=>{}}/>
                    </div>


                  </a>

              </li>
            )
          })
        }
      </ul>
    </div> 
  );
}
 
export default ProductList;

