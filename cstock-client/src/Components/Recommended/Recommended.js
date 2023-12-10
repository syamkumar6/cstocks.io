import React from 'react'
import styles from './Recommended.module.css'
import { Button } from 'react-bootstrap'

function Recommended() {
  return (
    <>
      <section>
        <h2>Recommended</h2>
        <div className={styles.recommendedbtns}>
            <Button variant="outline-secondary">All</Button>
            <Button variant="outline-secondary">Noval</Button>
            <Button variant="outline-secondary">Kids</Button>
            <Button className={styles.cbtn}>Medical</Button>
        </div>
      </section>
    </>
  )
}

export default Recommended