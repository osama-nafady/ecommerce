import React from 'react'
import Style from './NotFound.module.css'
import notFound from './../../assets/images/error.svg'

export default function NotFound() {
    return <>
        <div className="d-flex justify-content-center">
            <img src={notFound} className="w-75 mx-auto" alt="" />
        </div>
    </>
}
