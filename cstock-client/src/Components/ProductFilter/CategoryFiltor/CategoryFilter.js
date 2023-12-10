import React from "react";
import styles from "./CategoryFiltor.module.css";
import { Button } from "react-bootstrap";

function CategoryFilter({ Categories, filterItems, setbooks, AllBooks }) {
  return (
    <div className="d-flex flex-column ">
      <h2>Category</h2>

      <Button className={styles.button} onClick={() => setbooks(AllBooks)}>
        All
      </Button>
      {Categories.map((item) => (
        <Button className={styles.button} onClick={() => filterItems(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

export default CategoryFilter;
