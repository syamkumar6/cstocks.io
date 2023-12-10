
import React, { useState } from "react";
import styles from "./Bookpage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import FilterCard from "../Components/Cards/FilterCard";
import CategoryFilter from "../Components/ProductFilter/CategoryFiltor/CategoryFilter";
import LanguageFilter from "../Components/ProductFilter/LanguageFilter/LanguageFilter";
import AuthorFilter from "../Components/ProductFilter/AuthorFiltor/AuthorFilter"
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData } from "react-router-dom";


const baseURL = process.env.REACT_APP_BASE_URL


export async function loader() {
  const res = await axios.get(`${baseURL}/books`)
  const allBooks = res.data
  return {allBooks}
}

function Bookspage(props) {
  const {allBooks} = useLoaderData()
  const [books, setbooks] = useState(allBooks);
  const [showSidebar, setShowSidebar] = useState(false);

  const Categories = [...new Set(allBooks.map((book) => book.category))];
  const Languages = [...new Set(allBooks.map((book) => book.language))]
  const Authors = [...new Set(allBooks.map((book) => book.author.name))]

  const filterCategories = (cat) => {
    const CategoryFilterBooks = allBooks.filter((newbook) => newbook.category === cat);
    setbooks(CategoryFilterBooks);
  };
  const filterlanguages = (lan) => {
    const LanguageFilterBooks = allBooks.filter((newbook) => newbook.language === lan)
    setbooks(LanguageFilterBooks)
  }
  const filterAuthors = (aut) => {
    const AuthorFilterBooks = allBooks.filter((newbook) => newbook.author.name === aut)
    setbooks(AuthorFilterBooks)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <main>
      <Container className={styles.mainContainer}>
      <button className={styles.button} onClick={toggleSidebar}>
      {showSidebar ? "Hide Filter" : "Show Filter"}
      </button>
        <Row>
          <Col sm={2} className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : styles.hideSidebar}`}>
            <CategoryFilter
              Categories={Categories}
              filterItems={filterCategories}
              setbooks={setbooks}
              AllBooks={allBooks}
            />
            <LanguageFilter 
              Languages = {Languages}
              filterItems = {filterlanguages}
              setbooks = {setbooks}
              AllBooks = {allBooks}
            />
            <AuthorFilter
              Authors = {Authors}
              filterItems={filterAuthors}
              setbooks={setbooks}
              AllBooks={allBooks}
            />
          </Col>

          <Col sm={10}>
            <ul className={styles.cardlist}>
              {books.map((book) => {
                return <FilterCard book={book}/>;
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Bookspage;
