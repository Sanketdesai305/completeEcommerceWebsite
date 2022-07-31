import React,{useState} from 'react';
import styled from 'styled-components';
import sliderItems from "../data";
import { ArrowRightOutlined,ArrowLeftOutlined } from '@material-ui/icons';
import {mobile} from "../responsive";


const Container = styled.div`
width:100%;
height:100vh; 
display:flex;
background-color :#f4e3e8 ;
position:relative;
overflow:hidden;
${mobile({display:"none"})};`;

const Arrow = styled.div`
width:50px;
height:50px; 
background-color:#fff4f4; 
border-radius:50%; 
display:flex;
align-items: center; 
justify-content:center; 
position:absolute; 
top:0px;
bottom:0px; 
margin:auto;
opacity:0.5; 
cursor:pointer;
z-index:2;
left : ${props=>props.direction==="left"&& "10px"};
right : ${props=>props.direction==="right"&& "10px"}; `;
const Wrapper = styled.div`
height:100%; display:flex;
transform: translateX(${(props) => props.slideIndex *  -100}vw);
transition: all 1.5s ease;`;
const Slide = styled.div`display:flex; align-items:center;width:100vw;height:100vh;
background-color: #${(props) => props.bg}`
const ImgContainer = styled.div`flex:1; height:80%; `
const InfoContainer = styled.div`flex:1; padding:50px;`
const Image = styled.img`height:150%;margin-top:-100px;`
const Title= styled.h1`font-size:70px;`
const Desc= styled.p`margin:50px 0px; font-size:20px; font-weight:500;letter-spacing:3px;`;
const Button= styled.button`padding:10px;font-size:20px;background-color:transparent; cursor:pointer; width:150px;`;
  const Slider = () => {
    const [slideIndex , setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === "left"){
                setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
              } else {
                setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
              } 
        }
 


  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow >
        <Wrapper slideIndex = {slideIndex}>
          {sliderItems.map((item=>
        <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
            <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Button>SHOP NOW</Button>
            </InfoContainer>
            
        </Slide>
          ))}
        </Wrapper>
    </Container>
  );
};

export default Slider;