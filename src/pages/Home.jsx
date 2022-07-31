import React from 'react'
import NavBar from "../components/NavBar";
import Announcements from '../components/Announcements';
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from '../components/Newsletter';
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
 <NavBar/>
 <Announcements/>
 <Slider/>
 <Categories/>
 <Products/>
 <Newsletter/>
 <Footer/>
    </>
  )
}

export default Home;