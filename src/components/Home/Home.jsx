import React from 'react'
import Style from './Home.module.css'
import FeaturedProduct from './../FeaturedProduct/FeaturedProduct';
import MainSlider from './../MainSlider/MainSlider';
import CategorySlider from './../CategorySlider/CategorySlider';

export default function Home() {
    
    return <>
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProduct/>
    </>
}
