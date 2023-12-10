import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from './HomeCarousel.module.css'

function Homepagecarousel(props) {
  const carousels = props.carousels;

  return (
    <Carousel fade className={styles.carousel}>
      {carousels.map((carousel) => {
        return (
          <Carousel.Item className={styles.carouselItem}>
            <img src={carousel.image} alt="" className="d-block w-100" />
            <Carousel.Caption>
              <h3>{carousel.title}</h3>
              <p>{carousel.about}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Homepagecarousel;
