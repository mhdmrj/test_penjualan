import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Product = ({ product }) => {
  return (
    <Row className='p-2'>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img className='py-3' src={product.image} variant='top' />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
          5 dari {product.numReviews} ulasan
          </Card.Text>
          <Card.Text as='h3'>Rp {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default Product