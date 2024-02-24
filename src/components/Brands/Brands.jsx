import React from 'react'
import Style from './Brands.module.css'
import axios from 'axios';
import Loader from './../Loader/Loader';
import { useQuery } from 'react-query';


export default function Brands() {

    function getBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    }
    const { isLoading, isFetching, isError, data, refetch } = useQuery('brands', getBrands);


    return <>
        <h1  class="text-main text-center mb-5">All Brands</h1>
        <div className="row gy-4">
            {isLoading ? (<Loader />) :
                (data?.data.data.map((brand) =>
                
                    <div className="col-md-3 text-center card">
                    <img src={brand.image} className='w-100' alt=""/>
                    <span >{brand.name}</span>
                    </div>
                
                ))}
        </div>
    </>
}
