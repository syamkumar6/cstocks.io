import React from "react";
import Header from "../Components/Navbar/Header";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";


function Rootroute() {
  return (
    <>
      <Header/>
      <main><Outlet/></main>
      <Footer/>
    </>
  );
}

export default Rootroute;
