import React from 'react'
import Style from './Categories.module.css'
import axios from 'axios';
import Loader from './../Loader/Loader';
import { useQuery } from 'react-query';

export default function Categories() {

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    const { isLoading, isFetching, isError, data, refetch } = useQuery('brands', getCategories);

    return <>
        <h1  class="text-main text-center mb-5">All Categories</h1>
        <div className="row gy-4">
            {isLoading ? (<Loader />) :
                (data?.data.data.map((category) =>
                
                    <div className="col-md-3 text-center card">
                    <img src={category.image} className='w-100' height={350} alt=""/>
                    <span >{category.name}</span>
                    </div>
                
                ))}
        </div>
    </>
}
