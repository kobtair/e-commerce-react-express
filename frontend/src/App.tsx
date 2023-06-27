import { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { About } from './pages/About'
import { NavBar } from './components/NavBar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'


function App() {
  

  return(<ShoppingCartProvider>
    <NavBar/>
    <Container className='mb-4'>
     <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/Store' element={<Store />} />
     <Route path='/About' element={<About />} />
     <Route path='/Login' element={<Login />} />
     <Route path='/Register' element={<Register />}/>
    </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}

export default App
