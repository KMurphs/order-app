import React, {useState} from 'react';
import './ClientList.css';
 
const ClientList = (props) => {

  const [activeItemIndex, setActiveItemIndex] = useState(0)

  return ( 
    <div className='container client-list mt-0 mt-md-5'>
      <ul className='list-group'>
        <li className={`list-group-item list-group-item-action `} 
            onClick={()=>{setActiveItemIndex(0); props.onSelectionChange({})}}>
              <a href="#client-form" className='client-list-add-box'>
                <i className="fas fa-plus"></i>
                <span><span className='d-none d-md-inline'>Reset Form and </span>&nbsp;Add New Client Details</span>
              </a>
        </li>

        {
          Object.keys(props.list).map((item, index) => { 
            return (

              <li key={index + 1} 
                className={`list-group-item list-group-item-action client-list-item ${activeItemIndex === index+1 ? 'list-group-item-primary' : '' }`} 
                onClick={()=>{setActiveItemIndex(index + 1); props.onSelectionChange(props.list[index])}}>

                  <div className='img-container'>
                    <img src={props.list[index].img_path || "/img/NoImage.png"} alt="No Picture Provided" className="img-thumbnail"></img>
                  </div>
                  <div>
                    <span className='client-list-text-primary'>{props.list[index].surname}&nbsp;<span className='client-list-text-secondary'><span className='d-inline d-md-none'><br/></span>{props.list[index].firstnames}</span><br/></span>
                    <span className='client-list-text-secondary d-none d-md-inline'><span className='client-list-text-disabled'>Phone: </span>{props.list[index].phone}<br/></span>
                    <span className='client-list-text-secondary d-none d-md-inline'><span className='client-list-text-disabled'>Email: </span>{props.list[index].email}<br/></span>
                    <span className='client-list-text-secondary d-none d-md-inline'><span className='client-list-text-disabled'>Country: </span>{props.list[index].country}</span>
                  </div>

              </li>
            )
          })
        }
      </ul>
    </div> 
  );
}
 
export default ClientList;

