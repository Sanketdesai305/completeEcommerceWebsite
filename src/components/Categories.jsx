import React from 'react'
import {categories}from "../cdata";
import styled from "styled-components";
import CategoriesItem from './CategoriesItem';
import {mobile} from "../responsive";

const Container = styled.div`display:flex;padding:20px;justify-content:space-between;
${mobile({padding:"0px", flexDirection:"column"})};`

function Categories() {
  return (
    <Container>
              {categories.map(item=>
        <CategoriesItem item = {item} key={item.id}/>
        )}
    </Container>
  )
}

export default Categories;