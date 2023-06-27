import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
export function Home(){
    const {isLoggedIn}=useShoppingCart()
    return (
        <div style={{textAlign: 'center', marginTop:"200px"}}>
          <h2 style={{fontSize: '40px'}}>Welcome to MCS Shop!</h2>
          <p>We offer a wide range of products from clothing to home decor at affordable prices. Shop now, and<br/>
             enjoy our user-friendly website and secure checkout process.</p>
          {!isLoggedIn && <div>
            <Link to={"/Login"}><Button style={{marginRight: '10px'} }>Sign In</Button></Link>
            <Link to={"/Register"}><Button>Register</Button></Link>
          </div>}
        </div>
      );
}