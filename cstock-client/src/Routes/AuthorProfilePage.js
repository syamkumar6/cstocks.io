import React from "react";
import styles from "./AuthorProfile.module.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
import PersonBookCard from "../Components/Cards/PersonBookCard";

const baseURL = process.env.REACT_APP_BASE_URL

export async function loader({ params }) {
  const res = await axios.get(`${baseURL}/persons/` + params.authorId);
  const person = res.data;
  const bookres = await axios.get(`${baseURL}/books`);
  const allBooks = bookres.data;
  return { person, allBooks };
}

function AuthorProfilePage() {
  const { person, allBooks } = useLoaderData();

  function filterBook(allBooks) {
    return allBooks.author.name === person.name;
  }
  const booksOfPerson = allBooks.filter(filterBook);
  console.log(booksOfPerson);
  return (
    <main className={styles.main}>
      <section className=" bg-dark text-light rounded-bottom">
        <Container className="p-4 square d-flex flex-row align-items-center">
          <div>
            <img
              src={person.image}
              alt="person img"
              className={styles.personImg}
            />
          </div>
          <div className="ms-5">
            <h2>{person.name}</h2>
            <span>Birth place : {person.birthplace}</span>
          </div>
        </Container>
        <Container className="pb-3">
          <h3>About</h3>
          <p>{person.about}</p>
        </Container>
      </section>
      <section className="container mt-3">
        <h2>Books of {person.name}</h2>
        <ul className="d-flex flex-row flex-wrap gap-3 m-4 list-unstyled">
          {
            booksOfPerson.map((book)=>{
              return(<PersonBookCard book= {book} books = {booksOfPerson}/>)
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default AuthorProfilePage;
