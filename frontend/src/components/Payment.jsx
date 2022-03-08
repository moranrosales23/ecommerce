import { useState, React, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Cards from "react-credit-cards"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "react-credit-cards/es/styles-compiled.css"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useDispatch } from "react-redux"
import "sweetalert2/dist/sweetalert2.css"

function Payment({ show, handleClose, products, total }) {
  const mp = new MercadoPago(import.meta.env.VITE_TK_PUBLIC, {
    locale: "es-PE",
  })

  const dispatch = useDispatch()

  const MySwal = withReactContent(Swal)

  const [card, setCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  })

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCard({ ...card, [name]: value })
  }

  useEffect(() => {
    try {
      const cardForm = mp.cardForm({
        amount: total + "",
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular de la tarjeta",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número de la tarjeta",
          },
          cardExpirationDate: {
            id: "form-checkout__cardExpirationDate",
            placeholder: "Data de vencimiento (MM/YYYY)",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de seguridad",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Cuotas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número de documento",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emisor",
          },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) return console.warn("Form Mounted handling error: ", error)
          },
          onSubmit: (event) => {
            event.preventDefault()
            Swal.showLoading()
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData()
            const items = products.map((product) => ({
              id: product._id,
              title: product.name,
              description: product.description,
              picture_url: product.image,
              quantity: 1,
              unit_price: product.price,
            }))

            fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Descripción del producto",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
                additional_info: { items },
              }),
            })
              .then((r) => r.json())
              .then(
                function (response) {
                  dispatch({ type: "CLEAR_CART" })
                  MySwal.fire("Message", response.status || response.error, "success")
                  handleClose()
                },
                (err) => MySwal.fire("Message", err.error, "error")
              )
          },
          onFetching: (resource) => {
            console.log("Fetching resource: ", resource)
          },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Cards cvc={card.cvc} expiry={card.expiry} focused={card.focus} name={card.name} number={card.number} />

        <Form className="mt-4" id="form-checkout">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Select name="identificationType" id="form-checkout__identificationType"></Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control type="text" name="identificationNumber" id="form-checkout__identificationNumber" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                placeholder="0000000000"
                id="form-checkout__cardNumber"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                id="form-checkout__cardholderName"
                placeholder="Pepe Lotaso"
                name="name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Card Expiration Date</Form.Label>
              <Form.Control
                type="text"
                name="expiry"
                placeholder="10/10"
                id="form-checkout__cardExpirationDate"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>cvc</Form.Label>
              <Form.Control
                type="tel"
                placeholder="123"
                name="cvc"
                id="form-checkout__securityCode"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="0000000000" id="form-checkout__cardholderEmail" />
            </Form.Group>
          </Row>

          <Form.Select name="issuer" id="form-checkout__issuer" style={{ display: "none" }}></Form.Select>

          <Form.Select name="installments" id="form-checkout__installments"></Form.Select>
          <Button variant="primary" type="submit" id="form-checkout__submit">
            Pay
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Payment
