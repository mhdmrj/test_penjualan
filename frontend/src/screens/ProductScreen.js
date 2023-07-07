import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, match])

  const [qty, setQty] = useState(1)

  const tambahKeranjangHandler = () => {
    navigate(`/keranjang/${id}?qty=${qty}`)
  }

  return <>
    <Link className='btn btn-dark my-3' to='/'>
      Kembali
    </Link>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              {product.rating} dari {product.numReviews} ulasan
            </ListGroup.Item>
            <ListGroup.Item>
              Harga: Rp {product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Deskripsi: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Harga:</Col>
                  <Col>
                    <strong>Rp {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Stok:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'Tersedia' : 'Habis'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={tambahKeranjangHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    Tambah Keranjang
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )}

  </>
}

export default ProductScreen