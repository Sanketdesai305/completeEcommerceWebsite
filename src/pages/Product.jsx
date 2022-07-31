import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import Announcements from '../components/Announcements';
import NavBar from '../components/NavBar';
import Newsletter from '../components/Newsletter';
import Footer from "../components/Footer";
import { Add, Remove } from '@material-ui/icons';
import {mobile} from "../responsive";
import {useLocation} from "react-router-dom";
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
const Container = styled.div``;

const Wrapper = styled.div`padding: 50px;display:flex;
${mobile({padding:"10px", flexDirection:"column"})}`;

const Image = styled.img`width: 100%;height:90vh;object-fit:cover;
${mobile({height:"60vh"})}`;

const ImgContainer = styled.div`flex:1;`;

const InfoContainer = styled.div`flex:1;padding:0px 50px;
${mobile({padding:"10px"})}`;

const Title= styled.h1`font-weight: 200;`;

const Desc = styled.p`margin:20px 0px;`

const Price = styled.span`font-weight: 100;font-size: 40px;`


const FilterContainer = styled.div`display:flex;justify-content:space-between;width: 50%;margin:30px 0px;
${mobile({width:"100%"})}`


const Filter = styled.span`display:flex; align-items:center;`

const FilterTitle = styled.span`font-weight: 200;font-size: 20px;`

const FilterColor = styled.div`width: 20px;height: 20px;border-radius:50%;background-color:${props=>props.color};
cursor:pointer;margin: 0px 5px;`

const FilterSize = styled.select`margin-left:10px;padding: 10px;`

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`display:flex;align-items:center;justify-content:space-between;width: 50%;
${mobile({width:"100%"})}`;

const AmountContainer = styled.div`display:flex;align-items:center;font-weight: 700;`;

const Amount = styled.span`width: 30px;height: 30px;border-radius:10px;border:1px solid teal;display:flex;
align-items:center;justify-content:center;margin: 0px 5px;`;

const Button = styled.button`
padding: 15px;
border:2px solid teal;
background-color: white;
cursor:pointer;
font-weight: 500;
&:hover{
    background-color:#ed981886 ;
}
`;

const Product = () => {
        const location = useLocation();
        const id = location.pathname.split("/")[2];
        const [product,setProduct] = useState({});
        const [quantity,setQuantity] = useState(1);
        const [color,setColor] = useState("");
        const [size,setSize] = useState("");
        const dispatch = useDispatch();
        useEffect(()=>{
          const getProduct = async ()=>{
            try{
              const res = await publicRequest.get("/products/find/"+id)
              setProduct(res.data)
            }catch(err){
              console.log(err)
            }
          }
          getProduct();
        },[id])
        const handleQuantity = (type)=>{
            if(type==="dec"){
                quantity >1 &&  setQuantity(quantity-1)
            }else{
                setQuantity(quantity +1)
            }
        }

        const handleClick=()=>{
            dispatch(addProduct({...product, quantity, color, size})
            );
        };
  return (
    <Container>
    <NavBar/>
    <Announcements/>
    <Wrapper>
        <ImgContainer><Image src={product.img}/></ImgContainer>
        <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>${product.price}</Price>
            <FilterContainer>
                <Filter>
                    <FilterTitle>Color</FilterTitle>
                    {product.color?.map(c=>(
                        <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                    ))}
                </Filter>
                <Filter>
                <FilterTitle>
                    Size
                </FilterTitle>
                <FilterSize onChange={(e)=>setSize(e.target.value)}>
                    {product.size?.map(s=>(
                    <FilterSizeOption key={s} >{s}</FilterSizeOption>
                    ))}
                   
                </FilterSize>
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                    <Remove onClick={()=>handleQuantity("dec")}/>
                    <Amount>{quantity}</Amount>
                    <Add onClick={()=>handleQuantity("inc")}/>
                </AmountContainer>
                <Button onClick={handleClick}>Add to Cart</Button>
            </AddContainer>
        </InfoContainer>
    </Wrapper>
    <Newsletter/>
    <Footer/>
    </Container>

  )
}

export default Product