import axios from "axios";
import c from "clsx";
import { useState } from "react";
import styles from "./Singlebook.module.css";
import { useLoaderData, Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import { addToCart } from "../ReduxStore/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import SingleBookCard from "../Components/Cards/SingleBookCard";

const baseURL = process.env.REACT_APP_BASE_URL
console.log(baseURL)

export async function loader({ params }) {
  const res = await axios.get(`${baseURL}/books/`+ params.bookId);
  const book = res.data;
  const bookres = await axios.get(`${baseURL}/books`);
  const loaderBooks = bookres.data;
  return { book, loaderBooks };
}

function Singlebook() {
  const { book, loaderBooks } = useLoaderData();
  const [isVisible, setIsVisible] = useState(false);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const addData = (e) => {
    dispatch(addToCart(e))
    toast.success("Item added In Your Cart")
  };

  function filterBook(loaderBooks) {
    return loaderBooks.category === book.category;
  }
  const filteredBooks = loaderBooks.filter(filterBook);
  console.log(filteredBooks);

  return (
    <main>
      <section>
        <Row>
          <Col
            sm={4}
            className={c(
              styles.imgContainer,
              "d-flex justify-content-center mt-5"
            )}
          >
            <div className={styles.imgDiv}>
              <img src={book.image} alt={"book"} />
            </div>
          </Col>
          <Col sm={8} className="d-flex flex-column mt-5 p-4 container">
            <div className="ps-4 d-flex flex-column">
              <h2>{book.title}</h2>
              <span
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className={styles.authorSpan}
              >
                by{" "}
                <Link
                  to={"/authors/" + book.author._id}
                  className={styles.author}
                >
                  {" "}
                  <img src="./Icons/profile.svg" alt="" /> {book.author.name}
                </Link>
              </span>
              {isVisible && (
                <span className={styles.authorNote}>Click to view profile</span>
              )}

              <span className="my-2"> Language : {book.language}</span>
              <span className="text-success fw-bold">
                &#x20b9; {book.price}/-
              </span>
            </div>
            <div className="p-4">
              <p className={open ? null : styles.bookAbout}>{book.about}</p>
              <button onClick={() => setopen(!open)} className={styles.readBtn}>
                {open ? "read less..." : "read more..."}
              </button>
            </div>

            <div className="ps-4 ">
              <Button className={styles.btn} onClick={() => addData(book)}>
                Add to Cart <img src="./Icons/Bcart.svg" alt="" />
              </Button>
              <Button className={styles.btn}>By now</Button>
            </div>
          </Col>
        </Row>
      </section>

      <section>
        <Container className="m-5">
          <h3>Recommended Books</h3>
          <ul className="d-flex flex-row flex-wrap gap-3 m-4 list-unstyled">
            {filteredBooks.map((book) => {
              return <SingleBookCard book={book}/>;
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}

export default Singlebook;
