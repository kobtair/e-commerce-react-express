import {  Button, Modal, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

type ShoppingCartProps = {
  isOpen: boolean
}



export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, user, isLoggedIn } = useShoppingCart()
  const [show, setShow] = useState(false);
  const [storeItems, setStoreItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
        const response = await axios.get('http://localhost:3000/products');
        setStoreItems(response.data.products);console.log(response.data.products)
    }
    fetchData();
}, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    try {
        const response = await axios.post('https://localhost:3000/cart', {
            userId: user.id,
            items: cartItems  ,
            
        });
        console.log(response.data);
        
        alert("Your order has been placed successfully!");
    } catch (error) {
        console.error(error);
        alert("An error occurred while placing your order. Please try again later.");
    }
}
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity 
              }, 0)
            )}
          </div>
        </Stack>
        {isLoggedIn &&(<Button onClick={handleShow} >Proceed to Checkout</Button>)}
        {!isLoggedIn &&(<Link to={'/login'}>Sign in to Checkout</Link>)}
        <Modal show={show} onHide={handleClose}>
        <form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
        Do you want to Proceed?
        
        </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" type="submit">Confirm</Button>
                </Modal.Footer>
                </form>
            </Modal>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
