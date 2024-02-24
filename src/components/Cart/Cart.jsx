import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {

    const { getLoggedCart, removeProductFromCart, updateProductQuantity,numOfCartItems, setNumOfCartItems } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    

    async function deleteProduct(id) {
        const { data } = await removeProductFromCart(id);
        setProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
    }
    async function getCart() {
        const { data } = await getLoggedCart();
        setProducts(data.data.products);
    }
    async function updateCount(id,count){
        const { data } = await updateProductQuantity(id,count);
        setProducts(data.data.products);
    }
    useEffect(() => {
        getCart();
    }, []);
    return <>
        <div className='bg-main-light p-4'>
            <h1>Shop Cart:</h1>
            <div className="d-flex justify-content-between align-items-center">
                <span className='text-main'>Total Price: 1000 EGP</span>
                <span className='text-main'>Total Cart Items: {numOfCartItems}</span>
            </div>
            {products.map(product =>
                <div className="row p-2 m-4 border-bottom align-items-center" key={product.product._id}>
                    <div className="col-md-2">
                        <img src={product.product.imageCover} className="w-100" alt={product.product.title} />
                    </div>
                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-md-9">
                                <h4>{product.product.title}</h4>
                                <h6 className='text-main my-3'> Price:
                                    <span className='text-black'>{product.price} EGP</span></h6>
                                <h6 className="cursor-pointer" onClick={() => deleteProduct(product.product.id)}>
                                    <i className='fa-solid fa-trash-can mx-2 text-main'></i>Remove</h6>
                            </div>
                            <div className="col-md-3 text-end">
                                <button className="btn btn-outline-main" onClick={()=>{updateCount(product.product.id,product.count+1)}}>+</button>
                                <span className='mx-2'>{product.count}</span>
                                <button className="btn btn-outline-main" onClick={()=>{updateCount(product.product.id,product.count-1)}} disabled={product.count === 1?"disabled":false}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </>
}
