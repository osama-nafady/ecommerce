import React from 'react'
import Style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { userContext } from './../../Context/UserContext';

export default function Layout() {
    const {setUserToken} = useContext(userContext);
useEffect(() => {
  if (localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'));
  }
}, [])

    return <>
    <div className='container'>
        <Navbar />
        <Outlet></Outlet>
        <Footer />
        </div>
    </>
}
