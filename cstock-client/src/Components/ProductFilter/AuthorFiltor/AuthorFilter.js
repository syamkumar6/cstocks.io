import React from "react";
import styles from "./Author.module.css";
import { Button } from "react-bootstrap";

function CategoryFilter({ Authors, filterItems, setbooks, AllBooks }) {
  return (
    <div className="d-flex flex-column ">
      <h2>Author</h2>

      <Button className={styles.button} onClick={() => setbooks(AllBooks)}>
        All
      </Button>
      {Authors.map((item) => (
        <Button className={styles.button} onClick={() => filterItems(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

export default CategoryFilter;