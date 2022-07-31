import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
const Container = styled.div`margin-top:25vh;`;
const Final = styled.div`text-align:center;justify-content:center;font-weight: 500;font-size: 50px;`
const Fin = styled.div`text-align:center;justify-content:center;font-weight: 400;font-size: 30px;`
const Logo = styled.h1`font-size: 60px;text-align:center;justify-content:center;font-weight: 400;margin-bottom:20px;`
const Success = () => {
    const location = useLocation();
    console.log(location)
  return (
    <>
    <Container>
    <Logo>Mush.</Logo>
    <Final>congrats! your order is on your way!</Final>
    <Fin>Thanks for shopping with us!</Fin>
    </Container>
    </>
  )
}

export default Success