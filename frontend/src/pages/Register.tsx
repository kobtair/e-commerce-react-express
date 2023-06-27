import React, { useState } from 'react';
import axios from 'axios'
import { useShoppingCart } from '../context/ShoppingCartContext';

export function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress]= useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const {getUser, login}= useShoppingCart()
  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (!name || !email || !password || !passwordConfirmation) {
      setError('Please fill out all fields');
    } else if (password !== passwordConfirmation) {
      setError('Passwords do not match');
    } else {
    try{
        const response = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        address
    });
    const data = response.data;
    getUser(data)
    login()
    window.location.href = '/store';

} catch (error) {
    setError(error.response.data.error);
    console.error(error);
}
}
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1 style={{marginLeft: '60px'}}>Register</h1>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        </label>
        <br />
        <button  type="submit">Register</button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>
      
    </div>
  );
}
