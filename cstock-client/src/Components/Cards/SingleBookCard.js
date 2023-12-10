import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./FilterCard.module.css";
import { Link } from "react-router-dom";

function SingleBookCard({ book }) {
  return (
    <li>
      <Link to={"/books/" + book._id} className={styles.cardLink}>
        <Card className={styles.card}>
            <Card.Img src={book.image} className={styles.bookCardImg} />
            <Card.Title className={styles.cardTitle}>{book.title}</Card.Title>
            <Card.Text className={styles.cardText}>
              By {book.author.name}
            </Card.Text>
        </Card>
      </Link>
    </li>
  );
}

export default SingleBookCard;