import React from 'react';
import Swiper from 'react-id-swiper';
import './PicturePreviewSwiper.css';



const PicturePreviewSwiper = (props) => {
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    slidesPerView: 5,
    spaceBetween: 0,
    freeMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }
 
  return(
    <div className="picture-preview-swiper-container picture-preview-swiper-container--small">
      <div className="picture-preview-swiper">
        <Swiper {...params}>
          {props.pictures.map((item, index) => <div key={index} className='picture-preview-slider-element-slide'><img src={item.src} alt={item.alt} className="img-thumbnail picture-preview-slider__picture"/></div>)}
        </Swiper>
      </div>
      <div className="picture-preview-add">
        <button type="button" className="btn btn-outline-light"><i className="fas fa-plus"></i></button>
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