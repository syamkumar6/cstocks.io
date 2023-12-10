import React from "react";
import styles from "./SignUp.module.css";
import { useFormik } from 'formik';
import { signUpSchema } from "../../UserSchemas/signUpSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: ""
}

function SignUpForm() {
  
  const navigate = useNavigate()
 const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit : (values) => {
    console.log(values)
    
    axios.post(`${baseURL}/users/signup`,({values}))
    .then(res => {
      console.log(res)
      alert('Successfully signed up!')
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
    })
    

    }
  })

  return (<div>
      <h2 className="pb-2 border-bottom">Sign up</h2>
    <form onSubmit={Formik.handleSubmit} className="d-flex flex-column align-items-center">
      <div className={styles.inputBox}>
        <input
          type="text"
          autoComplete="off"
          name="name"
          id="name"
          required
          value={Formik.values.name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          className={styles.formInput}
        />
        {Formik.errors.name && Formik.touched.name ? (
          <p className={styles.error}>{Formik.errors.name}</p>
        ) : null}
        <label className={styles.formLabel} htmlFor="name">
          Name
        </label>
      </div>

      <div className={styles.inputBox}>
        <input
          type="email"
          autoComplete="off"
          name="email"
          id="email"
          placeholder=""
          required
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          className={styles.formInput}
        />
        {Formik.errors.email && Formik.touched.email ? (
          <p className={styles.error}>{Formik.errors.email}</p>
        ) : null}
        <label className={styles.formLabel} htmlFor="email">
          Email
        </label>
      </div>

      <div className={styles.inputBox}>
        <input
          type="password"
          autoComplete="off"
          name="password"
          id="password"
          placeholder=""
          required
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          className={styles.formInput}
        />
        {Formik.errors.password && Formik.touched.password ? (
          <p className={styles.error}>{Formik.errors.password}</p>
        ) : null}
        <label className={styles.formLabel} htmlFor="password">
          Password
        </label>
      </div>

      <div className={styles.inputBox}>
        <input
          type="password"
          autoComplete="off"
          name="confirm_password"
          id="confirm_password"
          placeholder=""
          required
          value={Formik.values.confirm_password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          className={styles.formInput}
        />
        {Formik.errors.confirm_password && Formik.touched.confirm_password ? (
          <p className={styles.error}>{Formik.errors.confirm_password}</p>
        ) : null}
        <label className={styles.formLabel} htmlFor="confirm_password">
          Confirm password
        </label>
      </div>

      <button type="submit" className={styles.submitBtn}>Submit</button>
      <p className={styles.privacyNote}>
        By creating an account or logging in,<br /> you agree to  Cstocks Conditions of Use and <br /> Privacy Policy.</p>
    </form>
  </div>
    
  );
}

export default SignUpForm;
