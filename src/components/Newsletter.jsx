import React from 'react';
import {Send} from "@material-ui/icons";
import styled from "styled-components";
import {mobile} from "../responsive";
const Container= styled.div`
height:60vh;
background-color:#6666;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;`

const Title= styled.h1`font-size:70px;margin-bottom:20px;
${mobile({fontSize:"50px"})}`

const Description= styled.div`font-size:24px;font-weight:300;margin-bottom:20px;${mobile({textAlign:"center"})}`

const InputContainer= styled.div`width:50%;height:40px;background-color:white;
display:flex;justify-content:space-between;border: 1px solid grey;
${mobile({width:"80%"})}`;

const Input= styled.input`
 flex:7;border:none; padding-left:20px;`

const Button= styled.button`flex:1;border:none;background-color:teal;color:white;`

const Newsletter = () => {
  return (
    <Container>
        <Title>News Letter</Title>
            <Description>Get timely updates from your favorite products</Description>
            <InputContainer>
                <Input placeholder = "email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
    </Container>
  )
}

export default Newsletter