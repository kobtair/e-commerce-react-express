import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import axios from 'axios'

export function Store() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const response = await axios.get('http://localhost:3000/products');
          setStoreItems(response.data.products);console.log(response.data.products)
      }
      fetchData();
  }, []);

    
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
