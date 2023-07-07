import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const keranjang = useSelector(state => state.keranjang)
  const { shippingAddress } = keranjang

  if (!shippingAddress) {
    navigate('/pengiriman')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/tempatpemesan')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Metode Pembayaran</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Pilih Metode</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal Atau Kartu Kredit'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>
            {/*<Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>
  </Form.Check> */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Melanjutkan
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen