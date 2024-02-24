import React from 'react'
import Style from './CategorySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    };

    const { data } = useQuery('categorySlider', getData);
    
    return <>
        <div className='my-5'>
            <Slider {...settings}>
                {data?.data.data.map((category) =>
                    <>
                        <img src={category.image} className='w-100' height={300} alt={category.name} />
                        <h4>{category.name}</h4>
                    </>)
                }
            </Slider>

        </div>

    </>
}
