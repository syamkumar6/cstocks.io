import React from 'react'
import styles from './Language.module.css'
import { Button } from "react-bootstrap";

function LanguageFilter({setbooks, AllBooks, filterItems, Languages}) {
  return (
    <div className="d-flex flex-column ">
    <h2>Language</h2>

    <Button className={styles.button} onClick={() => setbooks(AllBooks)}>
      All
    </Button>
    {Languages.map((item) => (
      <Button className={styles.button} onClick={() => filterItems(item)}>
        {item}
      </Button>
    ))}
  </div>
  )
}

export default LanguageFilter