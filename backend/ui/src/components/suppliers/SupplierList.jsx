import React, {useState} from 'react';
import './SupplierList.css';
 
const SupplierList = (props) => {

  console.log(props.list)

  const [activeItemIndex, setActiveItemIndex] = useState(0)

  return ( 
    <div className='container supplier-list mt-0 mt-md-5'>
      <ul className='list-group'>
        <li className={`list-group-item list-group-item-action `} 
            onClick={()=>{setActiveItemIndex(0); props.onSelectionChange({})}}>
              <a href="#supplier-form" className='supplier-list-add-box'>
                <i className="fas fa-plus"></i>
                <span><span className='d-none d-md-inline'>Reset Form and </span>&nbsp;Add New Supplier Details</span>
              </a>
        </li>

        {
          Object.keys(props.list).map((item, index) => { 
            return (

              <li key={index + 1} 
                className={`list-group-item list-group-item-action supplier-list-item ${activeItemIndex === index+1 ? 'list-group-item-primary' : '' }`} 
                onClick={()=>{setActiveItemIndex(index + 1); props.onSelectionChange(props.list[index])}}>
                  <a href="#supplier-form" className='supplier-list-item-linkbox'>
                    <div className='img-container'>
                      <img src={props.list[index].img_path || "/img/NoImage.png"} alt={`Showing some ${props.formType}`} className="img-thumbnail"></img>
                    </div>
                    <div>
                      <span className='supplier-list-text-primary'>{props.list[index].storename} Store&nbsp; - <span className='supplier-list-text-secondary'><span className='d-inline d-md-none'><br/></span>{props.list[index].surname}</span><br/></span>
                      <span className='supplier-list-text-secondary d-none d-md-inline'><span className='supplier-list-text-disabled'>Phone: </span>{props.list[index].phone}<br/></span>
                      <span className='supplier-list-text-secondary d-none d-md-inline'><span className='supplier-list-text-disabled'>Website: </span>{props.list[index].website}<br/></span>
                      <span className='supplier-list-text-secondary d-none d-md-inline'><span className='supplier-list-text-disabled'>Country: </span>{props.list[index].country}</span>
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
 
export default SupplierList;

