import React from "react";
import styles from "./Sidebar.module.css";
import Category from "./Category/Category";
import Language from "./Language/Language";
import Author from "./Author/Author";

function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        
        <Language />
        <Category />
        <Author />
      </section>
    </>
  );
}

export default Sidebar;
