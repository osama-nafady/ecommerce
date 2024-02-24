import React, { useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';

export default function ProductDetails() {
    const [details, setDetails] = useState({});
    let { id } = useParams();

    async function getProductDetails() {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setDetails(data.data);
    }
    const { addProductToCart, setNumOfCartItems } = useContext(CartContext);

    async function addProduct(id) {
        let { data } = await addProductToCart(id);
        if (data.status === 'success') {
            toast.success(data.message, {
                position: 'bottom-right',
                duration: 2500,
                style: {
                    minWidth: '400px',
                }
            });
            setNumOfCartItems(data.numOfCartItems);
        }
    }
    useEffect(() => {
        getProductDetails();
    }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return <div className="row align-items-center mt-5">
        <div className="col-md-3">
            <Slider {...settings}>
                {details?.images?.map((element) => <img src={element} className='w-100' alt="" />)}
            </Slider>

        </div>
        <div className="col-md-9">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p className='fw-bold'>{details.category?.name}</p>
            <div className="d-flex justify-content-between my-3 fw-bold">
                <span>{details.price} EGP</span>
                <span><i className='fa-solid fa-star rating-color'></i>4.3</span>
            </div>
            <button className='btn bg-main w-100' onClick={() => { addProduct(details.id) }}>Add to Cart</button>
        </div>
    </div>
}
