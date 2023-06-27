import React, { useState } from 'react';
import '../css/Login.css'
import axios from 'axios';
import { Container, Navbar } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { ShoppingCart } from '../components/ShoppingCart';

export function Login() {
  const {login, getUser}= useShoppingCart()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate= useNavigate()

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter a valid email and password');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/login', {
            email,
            password
        });
        const data = response.data;
          getUser(data)
          login()
          navigate('/store')
        
    } catch (error) {
        setError(error.response.data.error);
        console.error(error);
    }
}
    }
  
  return (
    <Container >
      <form className='form' onSubmit={handleSubmit}>
        <h1 style={{marginLeft: '60px'}}>Sign In</h1>
        <label className='label'>
          Email:
          <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label className='label'>
          Password:
          <input className='input' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button className='button' type="submit">Sign In</button>
        {error && <p className='error'>{error}</p>}
      </form>
      
    </Container>
  );
}


