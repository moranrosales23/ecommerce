import { Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useSelector } from "react-redux"
import { useState } from "react"
import Payment from "./Payment"

function Cart() {
  const products = useSelector((state) => state.cart)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const total = products.reduce((sum, p) => sum + p.price, 0)

  async function pay() {
    setShow(true)
    /*const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: products.map((p) => p._id) }),
    })

    const data = response.json()
    alert("Orden creada!")*/
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Carro de Compras</Card.Header>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product._id} className="d-flex justify-content-between">
            {product.name}
            <span>${product.price}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <div className="d-flex justify-content-between fw-bold">
            Total: <span>${total}</span>
          </div>
          {total > 0 ? (
            <div className="text-center mt-3 cho-container">
              <Button variant="primary" onClick={pay}>
                Ir a Pagar
              </Button>
            </div>
          ) : null}
        </ListGroup.Item>
      </ListGroup>
      {show && <Payment show={show} handleClose={handleClose} products={products} total={total} />}
    </Card>
  )
}

export default Cart
