import React, { useState } from 'react';
import styled from "styled-components";
import NavBar from '../components/NavBar';
import Announcement from "../components/Announcements";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {useLocation} from "react-router-dom"

const Container = styled.div``;

const Title = styled.div`margin: 20px;font-size: 40px;`;

const FilterContainer = styled.div`
display:flex; 
justify-content:space-between;`;


const Filter = styled.div`margin: 20px;font-weight: 600;`;

const FilterText = styled.span`font-size: 20px;`;

const Select = styled.select`margin: 20px; padding: 10px;font-weight: 600;`
const Options = styled.option`margin: 20px;font-weight: 600;`

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState("newest")
  const handlefilters = (e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value,
    })
  }
  return (
    <Container>
        <NavBar/>
        <Announcement/>
        <Title>
          {cat}
        </Title>
        <FilterContainer>
          <Filter><FilterText>Filter Products: </FilterText>
          <Select name = "color"onChange={handlefilters}>
            <Options disabled >
              Color
            </Options>
            <Options>White</Options>
            <Options>Black</Options>
            <Options>Red</Options>
            <Options>Blue</Options>
            <Options>Yellow</Options>
            <Options>Green</Options>
          </Select>
          <Select name = "size"  onChange={handlefilters}>
            <Options disabled >
              Size
            </Options>
            <Options>XS</Options>
            <Options>S</Options>
            <Options>M</Options>
            <Options>L</Options>
            <Options>XL</Options>
            <Options>XXL</Options>
          </Select>
          </Filter>
          <Filter>
            <FilterText>Sort products: </FilterText>
            <Select onChange={(e)=>setSort(e.target.value)}>
              <Options value = "newest">Newest</Options>
              <Options value = "asc">Price(asc)</Options>
              <Options value = "desc">Price(desc)</Options>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} sort={sort} filters={filters}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList