import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import React, { useContext, useState } from 'react'
import { userContext } from './../../Context/UserContext';

export default function Login() {
    let {setUserToken} = useContext(userContext);
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const[loader, setLoader] = useState(false);
    

    async function submitLogin(values) {
        setLoader(true);
        let { data } = await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .catch((err) => {
                setLoader(false);
                setError(err.response.data.message)
            });

        if (data.message === 'success') {
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            setLoader(false);
            navigate('/')
        }
    }
    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: submitLogin
    })
    return <>

        <div className='w-75 mx-auto py-5'>
            <h3>Login Now</h3>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={formik.handleSubmit}>
               <label htmlFor="name">Email: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' className='form-control mb-2' name='email' />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}
                <label htmlFor="name">Password: </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' className='form-control mb-2' name='password' type='password' />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mt-2 bg-main text-white'>
                    {loader ? (<Audio
                        height="40"
                        width="50"
                        color="#fff"
                        ariaLabel="audio-loading"
                        wrapperStyle={{}}
                        wrapperClass="wrapper-class"
                        visible={true}
                    />) : ('Login')}
                </button>
            </form>

        </div>

    </>
}
