import axios from "axios";
import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { Link, useLoaderData } from "react-router-dom";
import Homepagecarousel from "../Components/Carousels/Homepagecarousel";
import BookCard from "../Components/Cards/Bookcard";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addBooks } from "../ReduxStore/BookSlice";
import { loginStatus, addUser } from "../ReduxStore/UserSlice";

const baseURL = process.env.REACT_APP_BASE_URL

export async function loader() {
  const res = await axios.get(`${baseURL}/books`);
  const books = res.data;
  const Carousel_res = await axios.get(`${baseURL}/carousels`);
  const carousels = Carousel_res.data;
  const authres = await axios.get(`${baseURL}/persons`);
  const authors = authres.data;
  return { books, carousels, authors };
}

function Homepage(props) {
  const dispatch = useDispatch()
  const { books, carousels, authors } = useLoaderData();
  const Books = useSelector(state =>state.books)
  console.log(authors)
  axios.defaults.withCredentials = true
  useEffect(() => {
      axios.get(`${baseURL}/users/verify`)
      .then(res => {
          if(res.data.Status === "Success") {
            dispatch(loginStatus(true))
            dispatch(addUser(res.data.user))
          }else {
            dispatch(loginStatus(false))
            
          }
      })
  }, [])

  useEffect(()=>{
    dispatch(addBooks(books))
  },[])

  return (
    <main>
      <section>
        <Homepagecarousel carousels={carousels} />
      </section>

      <section>
        <Container className={styles.container}>
          <h1>Popular books of 2023</h1>
          <ul className="d-flex flex-row flex-wrap gap-4 m-4 list-unstyled">
            {Books.Allbooks.map((book, index) => {
              if (index < 10) {
                return (<BookCard book={book} books ={Books.Allbooks}/>)
              }
            })}
          </ul>
          <div className="d-flex justify-content-end">
          <Link to={'/books'} className={styles.viewButton}>View More..</Link>
          </div>
          
        </Container>
      </section>

      <section>
        <Container>
          <h1>Top authors</h1>

          <ul className="d-flex flex-row flex-wrap gap-4 m-4 list-unstyled">
            {
              authors.map((author,index) => {
                if (index < 5)
                return <li>
                  <Link to={"/authors/" +author._id} className={styles.authorBox}>
                     <img src={author.image} alt="" className={styles.authorImg} />
                     <h6>{author.name}</h6>
                  </Link>
                </li>
              })
            }
          </ul>
        </Container>
      </section>
    </main>
  );
}
 
export default Homepage;
