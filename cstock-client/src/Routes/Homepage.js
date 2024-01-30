import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link, useLoaderData } from "react-router-dom";
import Homepagecarousel from "../Components/Carousels/Homepagecarousel";
import BookCard from "../Components/Cards/Bookcard";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
  const [loading, setLoading] = useState(true);

  
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
    setLoading(false);
  },[])

  return (
    <main>
      <section>
        <Homepagecarousel carousels={carousels} />
      </section>

      <section>
        {loading ? ( // Conditionally render spinner while loading
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container className={styles.container}>
            <h1>Popular books of 2024</h1>
            <ul className="d-flex align-items-center flex-md-wrap flex-md-row flex-column   gap-4 m-4 list-unstyled">
              {Books.Allbooks.map((book, index) => {
                if (index < 10) {
                  return <BookCard book={book} books={Books.Allbooks} />;
                }
              })}
            </ul>
            <div className="d-flex justify-content-end">
              <Link to={"/books"} className={styles.viewButton}>
                View More..
              </Link>
            </div>
          </Container>
        )}
      </section>
    </main>
  );
}
 
export default Homepage;
