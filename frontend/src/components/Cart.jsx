import { Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import Payment from "./Payment"

function Cart() {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.cart)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const total = products.reduce((sum, p) => sum + p.price, 0)

  async function pay() {
    setShow(true)
  }

  function deleteProduct(id) {
    dispatch({ type: "REMOVE_PRODUCT", payload: id })
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Carro de Compras</Card.Header>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product._id} className="d-flex justify-content-between">
            {product.name}
            <span>${product.price}</span>
            <Button variant="danger" className="py-0 px-2" onClick={() => deleteProduct(product._id)}>
              <span>x</span>
            </Button>
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
