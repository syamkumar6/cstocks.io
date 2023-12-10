import React, { useEffect } from 'react'
import styles from './SignIn.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { signInSchema } from '../../UserSchemas/signInSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginStatus, addUser } from "../../ReduxStore/UserSlice";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from "react-hot-toast";


const initialValues = {
    email: "",
    password: ""
}

const baseURL = process.env.REACT_APP_BASE_URL

function SignInForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit : (values) => {

        axios.defaults.withCredentials = true
        axios.post(`${baseURL}/users/login`,({values}))
        .then(res => {
          if(res.data.Message !== "No Records existed"){
            if(res.data.Password !== "Incorrent password"){
              toast.success("Login Successful")
              navigate('/')
            }else{
              toast.error(res.data.Password)
            }
          }else{
            toast.error(res.data.Message)
          }
        })
        .catch(err => {
          console.log(err)
        })
        }
      })

      axios.defaults.withCredentials = true
      useEffect(() => {
          axios.get(`${baseURL}/users/verify`)
          .then(res => {
              if(res.data.Status === "Success") {
                dispatch(loginStatus(true))
                dispatch(addUser(res.data.user))
              }else {
                dispatch(loginStatus(false))
                setMessage(res.data.Message)
                // alert(message)
              }
          })
      }, [])

  return ( <div>
    <h2 className="pb-2 border-bottom">Login Account</h2>
    <form onSubmit={Formik.handleSubmit} className="d-flex flex-column align-items-center">
        <div className={styles.inputBox}>
            <input type="emai"
            autoComplete="off"
            name="email"
            id="email"
            required
            value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
            className={styles.formInput}
            />
             {Formik.errors.email && Formik.touched.email ? (
          <p className={styles.error}>{Formik.errors.email}</p>
        ) : null}
            <label htmlFor="" className={styles.formLabel}>Email</label>
        </div>
        <div className={styles.inputBox}>
            <input type="password" 
            autoComplete="off"
            name="password"
            id="password"
            required
            value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
            className={styles.formInput}
            />
            {Formik.errors.password && Formik.touched.password ? (
          <p className={styles.error}>{Formik.errors.password}</p>
        ) : null}
            <label htmlFor=""className={styles.formLabel}>Password</label>
        </div>
        <Link className={styles.Link}>Forgot password?</Link>
        <button type="submit" className={styles.submitBtn}>Login</button>
    </form>
  </div>
    
  )
}

export default SignInForm
