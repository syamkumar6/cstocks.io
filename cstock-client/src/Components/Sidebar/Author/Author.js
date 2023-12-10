import React from 'react'
import styles from './Author.module.css'

function Author() {
  return (
    <div>
      <h2>Author</h2>

      <div>
        <label className={styles.sidebarcontainer } >All
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.sidebarcontainer } >Romance
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.sidebarcontainer } >Medical
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.sidebarcontainer } >Noval
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
    </div>
  )
}

export default Author