import React from 'react'
import Style from './ProductItem.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductItem({ product }) {

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

    return <div className="col-md-2 product">
        <Link to={`details/${product.id}`} >
            <img src={product.imageCover} className='w-100' alt="" />
            <h6 className='text-main'>{product.category.name}</h6>
            <h2 className='h5 my-3'>{product.title.split(' ').splice(0, 2).join(' ')}</h2>
            <div className="d-flex justify-content-between my-3">
                <span>{product.price} EPG</span>
                <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
            </div>
        </Link>
        <button className='btn bg-main w-100' onClick={() => { addProduct(product.id) }}>ADD TO CART</button>
    </div>

}
