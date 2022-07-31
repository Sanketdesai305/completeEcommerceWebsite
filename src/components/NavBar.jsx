import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {mobile} from "../responsive";
import { useSelector,useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { logout } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
height:60px;
${mobile({height:"50px"})};
`;
const Wrapper = styled.div`
padding:10px 25px;
display:flex;
align-items:center;
justify-content:space-between;
${mobile({margin:"10px 0px"})};`;
const Left = styled.div`flex:1; align-items:center; display:flex;`
const Language = styled.span`font-size:20px; cursor:pointer;${mobile({display:"none"})}`;
const SearchContainer = styled.div`border:0.7px solid lightgrey; 
display:flex; align-items:center;  
margin-left:25px;
${mobile({marginLeft:"0px",marginRight:"3px"})}`;
const Input = styled.input` border:none; ${mobile({width:"50px"})}`;
const Logo = styled.h1`font-weight:bold;${mobile({fontSize:"25px"})}`;
const Center = styled.div`flex:1; text-align:center;`
const Right= styled.div`flex:1; display:flex; align-items:center; justify-content:flex-end;
${mobile({justifyContent:"center",flex:2})}`
const MenuItem = styled.div`font-size:20px; cursor:pointer; margin-left:25px;
${mobile({fontSize:"12px" ,fontWeight:'bold'})}`
const Menu = styled.button`font-size:20px; cursor:pointer; margin-left:25px;
${mobile({fontSize:"12px"})}`
const NavBar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const user = useSelector(state=>state.user.currentUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  Logout= (e)=>{
        e.preventDefault();
       logout(dispatch,{})
       navigate("/")
    }
  return (
    <Container>
        <Wrapper>
            <Left>
            <Language>EN</Language>
            <SearchContainer>
                <Input placeholder='Search'/>
                <Search style={{alignItem:Center}} />
            </SearchContainer>
            </Left>
            <Center><Logo><Link to="/" style={{textDecoration:"none"}}>Mush.</Link></Logo></Center>
            <Right>
                
            { user ? (<> 
                <Menu onClick={Logout}>Logout</Menu>
                 </>) :
                  (<>
                <Link to = "/login" style={{textDecoration:"none"}}>
                <MenuItem>Sign In</MenuItem>
                </Link>
                <Link to = "/register" style={{textDecoration:"none"}}>
                <MenuItem >Register</MenuItem>
                </Link>
                </>  )}
                
               
                <Link to="/cart">
                <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                    </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar;