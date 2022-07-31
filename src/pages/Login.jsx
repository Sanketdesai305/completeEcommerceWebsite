import React,{useState} from 'react';
import styled from "styled-components";
import { login } from '../redux/apiCalls';
import {mobile} from "../responsive";
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
const Container = styled.div`
width: 100%;height: 100vh;background: linear-gradient(
  rgba(255,255,255,0.5),
  rgba(255,255,255,0.5)
),
url("https://www.wallpaperuse.com/wallp/1-12340_m.jpg") center;
display:flex;align-items:center;justify-content:center; background-size:cover;`;

const Wrapper = styled.div`padding: 20px;width: 25%;background-color: white;
${mobile({width:"65%"})}`;

const Title = styled.h1`
font-size: 25px;font-weight: 300;`;

const Form = styled.div`display:flex;flex-direction:column;`;

const Input = styled.input`flex:1;min-width:40%;margin:10px  0px; padding: 10px;`;

const Button  = styled.button`cursor:pointer;width: 20%;border:none; padding:15px 20px;width: 40%; 
background-color:#e3a04f;color:white;margin: 20px 0px;
&:disabled{
  color:red;
  cursor:not-allowed;
}`;

const Linked = styled.a`margin: 5px 0px; text-decoration:underline;font-size: 14px;cursor:pointer;margin-bottom:10px;`;
const Error = styled.span`color:red;`

const Login = () => {
  const [username,setusername] = useState("");
  const [password,setpassword]=useState("");
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector((state)=>state.user);
  const handleClick = (e)=>{
    e.preventDefault();
    login(dispatch,{username,password})
  };

  return (
    <Container>
    <Wrapper>
      <Title>Sign In</Title>
      <Form>
        <Input placeholder="UserName" onChange={(e)=>setusername(e.target.value)}/>
        <Input placeholder="Password" type ="password"onChange={(e)=>setpassword(e.target.value)}/>
           <Button onClick={handleClick} disabled={isFetching}>Login</Button>
          {error && <Error>Something went wrong..</Error>}
          <Linked>Forgot the Password?</Linked>
          <Linked><Link to = "/register">Create a new account</Link></Linked>
      </Form>
    </Wrapper>
  </Container>
  )
}

export default Login