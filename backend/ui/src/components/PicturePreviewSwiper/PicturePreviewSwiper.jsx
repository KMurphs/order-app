import React from 'react';
import Swiper from 'react-id-swiper';
import './PicturePreviewSwiper.css';

import {useRenderDataFromPropsAndLocalChanges} from '../Form/RenderDataFromPropsAndLocalChanges'

const PicturePreviewSwiper = (props) => {

  const addInputID = `${new Date().getTime()}`

  const formHidden = !props.formHidden ? {} : props.formHidden
  const defaultPicture = '/imgs/NoImage.png'
  let initialPictures = props.pictures
  if(!props.pictures || props.pictures === null){
    initialPictures = [defaultPicture]
  }
  const [getRenderImgPathFromCurrentProps, setRenderImgPathFromLocalChanges] = useRenderDataFromPropsAndLocalChanges(initialPictures)

  const params = {
    slidesPerView: 5,
    spaceBetween: 0,
    freeMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }

  return(
    <div className="picture-preview-swiper-container picture-preview-swiper-container--small" id={`${new Date().getTime()}`}>

      
      <div className="picture-preview-swiper" style={{'width': `${formHidden.addBtn?'100%':'calc(100% - 4em)'}`}}>
        <Swiper {...params} key={props.key}>
          {
            getRenderImgPathFromCurrentProps(initialPictures).map((item, index) => 
              <div key={index} className='picture-preview-slider-element-slide' onClick={()=>props.onNewSelection(item)}>
                <img src={/^data:image/.test(item) || /^data:image/.test('imgs/') ? item : defaultPicture} alt={`swiper picture ${index}`} className="img-thumbnail picture-preview-slider__picture"/>
              </div>
            )
          }
        </Swiper>
      </div>


      <div className="picture-preview-add" style={{'display': `${formHidden.addBtn?'none':'inline-block'}`}}>
        <label htmlFor={`picture-preview-swiper__upload${addInputID}`} className="btn btn-outline-light"><i className="fas fa-plus"></i></label>
        <input type="file" 
                 style={{'display':'none'}}
                 className="custom-file-input" 
                 id={`picture-preview-swiper__upload${addInputID}`}
                 name="img_path" 
                 aria-describedby="supplier-form__upload" 
                 onChange={(inputFile)=> {
                     if(inputFile.target.files && inputFile.target.files[0]){
                      var reader = new FileReader();
                      reader.onload = (e) => {
                        if(/^data:image/.test(e.target.result)){
                          setRenderImgPathFromLocalChanges([e.target.result, ...getRenderImgPathFromCurrentProps(initialPictures).filter(img => img !== defaultPicture)])
                          props.onNewPicture([e.target.result,...getRenderImgPathFromCurrentProps(initialPictures)], e.target.result)
                        }
                      }
                      reader.readAsDataURL(inputFile.target.files[0]);  
                     } 
                 }}/>
      </div>


    </div>
  )
}
 
export default PicturePreviewSwiper;









// class PicturePreviewSlider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       swiper: new window.Swiper(this.refs.swiperTarget, {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//                 freeMode: true,
//               })
//      }
     
//   }
  
//   render() { 
//     console.log(JSON.stringify(this.state.swiper))
    
//     return ( 
//       <React.Fragment>
//         <div className="picture-preview-slider picture-preview-slider--small">
//           <div ref="swiperTarget" className="picture-preview-slider-element swiper-container">
//             <div className="picture-preview-slider-element-wrapper">
//               {console.log(JSON.stringify(this.refs))}
//               
//             </div>
//           </div>
//           
//         </div>
        
//         <hr/>
//         <br/>
//       </React.Fragment>
//     );
//   }
// }
 
// export default PicturePreviewSlider;