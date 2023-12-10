import React from 'react'
import styles from './Userprofile.module.css'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import c from "clsx";
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
const user = useSelector((state) => state.auth.userdata)
const navigate = useNavigate()
const baseURL = process.env.REACT_APP_BASE_URL

const handleLogout = () => {
    axios.get(`${baseURL}/users/logout`)
    .then(res => {
      if(res.data.Status === "Success") {
        // window.location.reload(true);
        navigate('/login')
      } else{
        alert("error")
      }
      
    }).catch(err => console.log(err))
  }

  return (
    <main> 
        <div className='container d-flex justify-content-between align-items-center pt-3'>
            <h1>Hellow {user.name}</h1>
            <button onClick={handleLogout} className={styles.logoutBtn}>Log out </button>
        </div>
        <Container className=' d-flex flex-row flex-*-wrap gap-4 justify-content-center align-center pt-4'>
            <div>
                <Link to={'/user/orders'} 
                className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                   <div>
                    <img src="./Icons/profileimg1.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Your Orders</h4></div>
                    <p className='fw-light'>Track, Return, or buy things again</p>
                   </div>
                </Link>
                <Link to={'#'} 
                className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                   <div>
                    <img src="./Icons/profileimg2.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Your Addresses</h4></div>
                    <p>Edit addresses for orders and <br /> gifts</p>
                   </div>
                </Link>
                <Link to={'#'} 
                className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                <div>
                    <img src="./Icons/profileimg3.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Contact Us</h4></div>
                    <p> </p>
                   </div>
                </Link>
            </div>
            <div>
                <Link to={'#'}
            className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                   <div>
                    <img src="./Icons/profileimg4.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Login & security</h4></div>
                    <p>Edit login, name, and email</p>
                   </div>
                </Link>
                <Link to={'#'} 
                className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                   <div>
                    <img src="./Icons/profileimg5.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Payment options</h4></div>
                    <p>Edit or add payment methods</p>
                   </div>
                </Link>
                <Link to={'#'} 
                className={c(styles.navBox, "d-flex align-items-center gap-3 text-decoration-none text-dark border border-dark rounded mb-0 p-3 mt-4")}>
                <div>
                    <img src="./Icons/profileimg6.svg" alt="" />
                   </div>
                   <div>
                    <div><h4>Get to Know Us</h4></div>
                    <span>About Us</span>
                    <span>Careers</span>
                    <span>Press Releases</span>
                   </div>
                </Link>
            </div>
        </Container>
    </main>
  )
}

export default UserProfile