import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/masuk'>
            <Nav.Link>Masuk</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Masuk</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/pengiriman'>
            <Nav.Link>Pengiriman</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pengiriman</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/pembayaran'>
            <Nav.Link>Pembayaran</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pembayaran</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/tempatpemesan'>
            <Nav.Link>Tempat Pemesan</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Tempat Pemesan</Nav.Link>
        )}
      </Nav.Item>

    </Nav>
  )
}

export default CheckoutSteps