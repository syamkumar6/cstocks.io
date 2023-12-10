import React from 'react'
import styles from './FilterCard.module.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function PersonBookCard(props) {
    const book = props.book

  return (
    <li>
      <Link to={"/books/" + book._id} className={styles.cardLink}>
        <Card className={styles.card}>
            <Card.Img src={book.image} className={styles.bookCardImg} />
            <Card.Title className={styles.cardTitle}>{book.title}</Card.Title>
        </Card>
      </Link>
    </li>
  )
}

export default PersonBookCard