import React from 'react'
import styles from './Language.module.css'

function Language() {
  return (
    <div>
      <h2>Language</h2>

      <div className={styles.flex}>
        <label className={styles.SidebarLabelContainer } >All
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.SidebarLabelContainer } >English
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.SidebarLabelContainer } >Hindi
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div>
        <label className={styles.SidebarLabelContainer } >Malayalam
          <input type="radio" name='test' />
          <span className={styles.checkmark}></span>
        </label>
      </div>
    </div>
  )
}

export default Language