import React from 'react'
import Style from './MainSlider.module.css'
import img1 from './../../assets/images/slider/slider-2.jpeg'
import img2 from './../../assets/images/slider/slider-image-1.jpeg'
import img3 from './../../assets/images/slider/slider-image-2.jpeg'
import img4 from './../../assets/images/slider/slider-image-3.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
    };

    return <>
        <div className="row mt-5 g-0">
            <div className="col-md-9">
                <Slider {...settings}>
                <img src={img1} height={400} className='w-100' alt="" />
                <img src={img4} height={400} className='w-100' alt="" />
                <img src={img2} height={400} className='w-100' alt="" />
                <img src={img3} height={400} className='w-100' alt="" />
                </Slider>
            </div>
            <div className="col-md-3">
                <img src={img3} height={200} className='w-100' alt="" />
                <img src={img2} height={200} className='w-100' alt="" />
            </div>
        </div>
    </>
}
