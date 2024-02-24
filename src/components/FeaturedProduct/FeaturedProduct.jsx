import React, { useEffect, useState } from 'react'
import Style from './FeaturedProduct.module.css'
import axios from 'axios';
import Loader from './../Loader/Loader';
import { useQuery } from 'react-query';
import { Button } from 'bootstrap';
import ProductItem from './../ProductItem/ProductItem';

export default function FeaturedProduct() {

    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    const { isLoading, isFetching, isError, data, refetch } = useQuery('FeaturedProducts', getData);

    return (
        <div className="row gy-4">
            {isLoading ? (<Loader />) :
                (data?.data.data.map((product) => <ProductItem product={product} />))}
        </div>

    )
}
