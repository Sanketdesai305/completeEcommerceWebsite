import { Facebook, Instagram, LocationOn, Phone, Pinterest, Twitter,Mail } from '@material-ui/icons'
import React from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";

const Container =styled.div`display:flex;
${mobile({flexDirection:"column"})}`;
const Left =styled.div`display:flex;flex-direction:column;padding:20px;flex:1;`
const Logo =styled.h1``
const SocialIcon =styled.div`width:40px;height:40px;border-radius:50%;
background-color:#${props=>props.color};color:white;display:flex;align-items:center;
justify-content:center;margin-right:20px;`
const SocialContainer =styled.div`display:flex;`
const Desc =styled.p`margin:20px 0px;`
const Center =styled.div`padding:20px;flex:1;`
const Right =styled.div`padding:20px;flex:1;
${mobile({backgroundColor:"#eee"})}`;
const Contactitem= styled.div`
margin-bottom:20px;display:flex; align-items:center;`;
const Payment = styled.img`width:100%;`
const Title = styled.h3`margin-bottom:30px;`
const List = styled.ul`margin:0;padding:0;list-style: none;display:flex;flex-wrap:wrap;`
const ListItem = styled.li`width:50%; margin-bottom:10px;`
const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>Mush.</Logo>
            <Desc>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                 Non autem distinctio perspiciatis nesciunt fuga eius eligendi, 
                odit voluptate corporis similique eveniet quibusdam dolores commodi magni ratione hic sed voluptatem deleniti.</Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                <Instagram/>
                </SocialIcon >
                <SocialIcon color="55ACEE">
                <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                <Pinterest/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact Details</Title>
                <Contactitem>
                <LocationOn style= {{marginRight:"10px"}}/> Sai Melrose Apartments, Vidyaranyapura4th block, Bangalore-560097.
                </Contactitem>
                <Contactitem>
                    <Phone style= {{marginRight:"10px"}}/> +91 8123359912. 
                </Contactitem>
                <Contactitem>
                    <Mail style= {{marginRight:"10px"}}/> Desai.Sanket92@gmail.com.
                </Contactitem>
                <Payment src=""/>
        </Right>
    </Container>
  )
}

export default Footer