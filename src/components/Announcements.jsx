import React from 'react';
import styled from "styled-components";

const Container = styled.div`background-color:teal;height:30px; color:white;
align-items:center; font-size:24px; text-align:center; justify-content:center;`

const Announcements = () => {
  return (
    <Container>
        <div>Free shipping on order above $50!</div>
    </Container>
  )
}

export default Announcements