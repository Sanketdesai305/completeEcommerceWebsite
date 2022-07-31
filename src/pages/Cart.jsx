import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Announcements from "../components/Announcements";
import {Add} from '@material-ui/icons';
import {Remove} from '@material-ui/icons';
import {mobile} from "../responsive";
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {userRequest} from "../requestMethods";
import { useNavigate,Link }  from "react-router-dom"
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
padding: 20px;
${mobile({padding:"10px"})}`;

const Title = styled.h1`font-weight: 300;text-align:center;`;

const Top= styled.div`display:flex; align-items:center; justify-content:center;justify-content:space-between;padding: 20px;`;

const TopButton = styled.button`padding: 10px;font-weight: 600;cursor:pointer; 
border:${props=>props.type ==="filled" && "none"};
background-color:${props=>props.type ==="filled" ? "black":"transparent"};
color:${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({display:"none"})}`;

const TopText = styled.span`text-decoration:underline; cursor: pointer;margin: 0px 10px;`;

const Bottom = styled.div`display:flex;justify-content:space-between;
${mobile({flexDirection:"column"})}`;

const Info = styled.div`flex:3;`;

const Product = styled.div`
display:flex;
justify-content:space-between;
${mobile({flexDirection:"column"})}`;

const ProductDetails = styled.div`
flex:2; display: flex;`;

const Image = styled.img`width: 200px;`;

const Details = styled.div`padding: 15px;display: flex;flex-direction:column;justify-content:space-between;`;


const ProductName = styled.div``;

const ProductID = styled.span``;

const ProductColor = styled.div`width: 20px;height: 20px;border-radius:50%;background-color:${props=>props.color};`;

const ProductSize = styled.span``;

const PriceDetails = styled.div`flex:1;display: flex;align-items:center;justify-content: center;flex-direction:column;`;

const ProductAmountContainer = styled.div`display: flex;align-items:center;margin-bottom:20px;`;

const ProductAmount = styled.div`font-size: 24px;margin: 5px;
${mobile({margin:"5px 15px"})}`;

const ProductPrice = styled.div`font-size: 30px;font-weight: 200;${mobile({marginBottom:"20px"})}`;
const Hr = styled.hr`
background-color:#eee; border:none;height: 1px;
`;

const Summary = styled.div`flex:1;
border:0.5px solid lightgrey;padding: 20px;height: 55vh;overflow:hidden;`;

const SummaryTitle = styled.h1`font-weight: 200;`;

const SummaryItem = styled.div`
margin: 30px 0px; justify-content:space-between;display:flex;
font-weight:${props=>props.type === "total" && "500"};
font-size:${props=>props.type === "total" && "24px"};
`;

const SummaryItemPrice = styled.span``;

const SummaryItemText = styled.span``;

const Button = styled.button`width: 100%;padding: 10px; cursor:pointer;background-color: black;color: white;font-weight: 600;`


const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const user = useSelector(state=>state.user.currentUser);
    const [stripeToken,setStripeToken] = useState(null)
    const navigate = useNavigate();
    const onToken =(token)=>{
        setStripeToken(token);
    }

    useEffect(()=>{
        const makeRequest = async() => {
            try{
                const res = await userRequest.post("/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success",{data:res.data});
            

            }catch{

            }
        }
        stripeToken &&  makeRequest();
    },[stripeToken, cart.total,navigate]);

const func =()=>{navigate('/login')}
  return (
    <Container>
        <NavBar/>
        <Announcements/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopButton><Link to='/' style={{textDecoration:"none"}}>Continue shopping</Link></TopButton>
                <TopTexts>
                <TopText>Shopping Bag(2)</TopText>
                <TopText>Your wih list</TopText>
                </TopTexts>

                {!user ? (<TopButton type="filled" onClick={func}>Checkout now</TopButton>): 
                (<StripeCheckout 
            name = "Mush fashion"
            billingAddress
            shippingAddress
            description={`your total is ${cart.total}`}
            amount= {cart.total*100}
            token={onToken}
            stripeKey={KEY}
            >
                 <TopButton type="filled" >Checkout now</TopButton>
                </StripeCheckout>)}
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map((product)=>(

                    <Product key={product._id}>
                        <ProductDetails>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName><b>Product</b>{product.title}</ProductName>
                                <ProductID><b>ID</b>{product._id}</ProductID>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>Size:</b>{product.size}</ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetails>
                            <ProductAmountContainer>
                                <Add />
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove />
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                        </PriceDetails>
                    </Product>))}
                    <Hr/>

                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$  -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    {!user ? (<TopButton type="filled" onClick={func}>Checkout now</TopButton>): 
                    (<StripeCheckout
                    name = "Mush fashion"
                    billingAddress
                    shippingAddress
                    description={`your total is ${cart.total}`}
                    amount= {cart.total*100}
                    token={onToken}
                    stripeKey={KEY}
                    >
                    <Button>CHECKOUT NOW</Button>
                    </StripeCheckout>)}
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart