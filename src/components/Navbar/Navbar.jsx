import React from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Login from './../Login/Login';
import Register from './../Register/Register';
import Products from './../Products/Products';
import Brands from './../Brands/Brands';
import Categories from './../Categories/Categories';
import logo from '../../assets/images/freshcart-logo.svg';
import { useContext } from 'react';
import { userContext } from './../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
    let { userToken, setUserToken } = useContext(userContext);
    const {numOfCartItems} = useContext(CartContext);

    let navigate = useNavigate();
function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
}
    return <>
        <nav
            className="navbar navbar-expand-sm navbar-light bg-light"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="FreshCart Logo" />
                </Link>

                <div className="collapse navbar-collapse" id="collapsibleNavId">
                {userToken && <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/cart">Cart <i className='fa-solid fa-shopping-cart'></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numOfCartItems}</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/brands">Brands</Link>
                        </li>


                    </ul>
}
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <i className='fab fa-facebook mx-2'></i>
                            <i className='fab fa-twitter mx-2'></i>
                            <i className='fab fa-instagram mx-2'></i>
                            <i className='fab fa-tiktok mx-2'></i>
                            <i className='fab fa-youtube mx-2'></i>
                        </li>
                        {userToken ? (<li className="nav-item">
                            <span className="nav-link cursor-pointer" onClick={()=>logout()}>Logout</span>
                        </li>) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>

                            </>
                        )}



                    </ul>
                </div>
            </div>
        </nav>

    </>
}
