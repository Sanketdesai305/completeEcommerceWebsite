import React,{useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import { publicRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 100%;height: 100vh;background: linear-gradient(
  rgba(255,255,255,0.5),
  rgba(255,255,255,0.5)
),
url("https://www.wallpaperuse.com/wallp/1-12340_m.jpg") center;
display:flex;align-items:center;justify-content:center;background-size:cover;
`;

const Wrapper = styled.div`padding: 20px;width: 40%;background-color: white;
${mobile({width:"65%",height:"65%",position:"relative"})}`;

const Title = styled.h1`
font-size: 25px;font-weight: 300;
${mobile({fontSize:"20px"})}`;

const Form = styled.div`display:flex;flex-wrap:wrap;
${mobile({position:"absolute"})}`;

const Input = styled.input`flex:1;min-width:40%;margin:20px 10px 0px 0px; padding: 10px;
${mobile({padding:"6px"})}`;

const Agreement = styled.span`font-size: 12px; display:flex;flex-direction:column;margin: 20px 0px;
${mobile({flexWrap:"wrap"})};`;

const Button  = styled.button`cursor:pointer;width: 20%;border:none; padding:15px 20px;width: 40%; 
background-color:#e3a04f;color:white;margin: 20px 0px;
${mobile({padding:"5px 20px"})}`;
const Error = styled.span`color:red;`
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const [msg,setmsg] = useState('')
  const { username, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    if (!username || !email || !password || !password2){setmsg("all fields are required")}
    else if (password !== password2) {setmsg("passwords do not match")}
    
    else{
       await publicRequest.post("/auth/register",formData)
       .then(()=>{navigate("/login")})
       .catch((err)=>{setmsg(` ${err} USERNAME OR EMAIL ALREADY EXISTS`)})

    }
   
  }
  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form>
          {/* <Input placeholder="FirstName"/>
          <Input placeholder="LastName"/> */}
          <Input placeholder="UserName" name='username'type="name" value ={username}onChange={onChange}/>
          <Input placeholder="Email"  name='email'type="email" value ={email}onChange={onChange}/>
          <Input placeholder="Password"  name='password' type="Password" value ={password}onChange={onChange}/>
          <Input placeholder="Confirm Password"type="password"name='password2'value ={password2}onChange={onChange}/>
          <Agreement>By creating an account, I consent to the processing of my personal 
            information in accordance with <b>Privacy policy</b>
            <Button  type='submit' name='submit' onClick={onSubmit}>Create</Button>
            {msg &&<Error>{msg} </Error>}
          </Agreement>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register