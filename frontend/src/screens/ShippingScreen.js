import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const keranjang = useSelector(state => state.keranjang)
  const { shippingAddress } = keranjang

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/pembayaran')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Pengiriman</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukan alamat'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>Kota</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukan kota'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Kode pos</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukan kode pos'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Negara</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukan negara'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Melanjutkan
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen