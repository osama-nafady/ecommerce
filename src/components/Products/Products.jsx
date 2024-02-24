import React from 'react'
import Style from './Products.module.css'
import axios from 'axios';
import Loader from './../Loader/Loader';
import { useQuery } from 'react-query';
import ProductItem from './../ProductItem/ProductItem';

export default function Products() {
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    const { isLoading, isFetching, isError, data, refetch } = useQuery('FeaturedProducts', getData);

    return (<>
    <input type="text" placeholder="search...." class="w-75 mx-auto form-control my-5"></input>
    
        <div className="row gy-4">
            {isLoading ? (<Loader />) :
                (data?.data.data.map((product) => <ProductItem product={product} />))}
        </div>
        </>
    )
}
