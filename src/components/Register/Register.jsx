import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
 
export default function Register() {

    let phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const[loader, setLoader] = useState(false);

    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'Minlength is 3').max(10, 'Maxlength is 10').required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        phone: Yup.string().matches(phoneRegex, 'Phone is invalid').required('Phone is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password start with upper letter,length 5 to 10').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref("password")], 'password and rePassword do not match').required('rePassword is required')
    })

    async function submitRegister(values) {
        setLoader(true);
        let { data } = await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .catch((err) => {
                setLoader(false);
                setError(err.response.data.message)
            });

        if (data.message === 'success') {
            setLoader(false);
            navigate('/Login')
        }
    }
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema,
        onSubmit: submitRegister
    })
    return <>

        <div className='w-75 mx-auto py-5'>
            <h3>Register Now</h3>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='name' className='form-control mb-2' name='name' />
                {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div> : ''}
                <label htmlFor="name">Email: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' className='form-control mb-2' name='email' />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}
                <label htmlFor="name">Phone: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='phone' className='form-control mb-2' name='phone' />
                {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div> : ''}
                <label htmlFor="name">Password: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' className='form-control mb-2' name='password' type='password' />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}
                <label htmlFor="name">rePassword: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} id='rePassword' className='form-control mb-2' name='rePassword' type='password' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-2 p-2">{formik.errors.rePassword}</div> : ''}
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mt-2 bg-main text-white'>
                    {loader ? (<Audio
                        height="40"
                        width="50"
                        color="#fff"
                        ariaLabel="audio-loading"
                        wrapperStyle={{}}
                        wrapperClass="wrapper-class"
                        visible={true}
                    />) : ('Register')}
                </button>
            </form>

        </div>

    </>
}
