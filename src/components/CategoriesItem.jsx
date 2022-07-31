import React from 'react'
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link} from "react-router-dom";


const Container = styled.div`flex:1;margin:3px; position:relative;`
const Image = styled.img`width:100%;height:100%; object-fit:cover;${mobile({height:"40vh"})}`
const Title = styled.h1`color:white;margin-bottom:20px;`
const Info = styled.div`position:absolute; width:100%; height:100%; top:0; 
display:flex;left:0;align-items:center; justify-content:center;flex-direction:column;`
const Button = styled.button`border:none;padding:10px;background-color:white;color:grey;cursor:pointer;font-weight:600;`

const CategoriesItem = ({item}) => {
  return (
    <Container>
      <Link to = {`/products/${item.cat}`}>
        <Image src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
      </Link>
    </Container>
  );
};

export default CategoriesItem;