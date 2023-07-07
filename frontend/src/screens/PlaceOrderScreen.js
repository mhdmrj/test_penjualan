import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const keranjang = useSelector(state => state.keranjang)

  // calculate price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  keranjang.itemsPrice = addDecimals(keranjang.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0))

  keranjang.shippingPrice = addDecimals(keranjang.itemsPrice > 100 ? 0 : 100)
  keranjang.taxPrice = Number((0.15 * keranjang.itemsPrice).toFixed(2))
  keranjang.totalPrice = (
    Number(keranjang.itemsPrice) +
    Number(keranjang.shippingPrice) +
    Number(keranjang.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: keranjang.cartItems,
        shippingAddress: keranjang.shippingAddress,
        paymentMethod: keranjang.paymentMethod,
        itemsPrice: keranjang.itemsPrice,
        shippingPrice: keranjang.shippingPrice,
        taxPrice: keranjang.taxPrice,
        totalPrice: keranjang.totalPrice,
      }))
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Pengiriman</h2>
              <p>
                <strong>Alamat:</strong>{' '}
                {keranjang.shippingAddress.address},
                {keranjang.shippingAddress.city}{' '},
                {keranjang.shippingAddress.postalCode}, {' '}
                {keranjang.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metode Pembayaran</h2>
              <strong>Metode: </strong>
              {keranjang.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Pesanan Barang</h2>
              {keranjang.cartItems.length === 0 ? <Message>Keranjang anda kosong</Message> : (
                <ListGroup variant='flush'>
                  {keranjang.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rp {item.price} = Rp {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Ringkasan Pesanan</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Barang</Col>
                  <Col>Rp {keranjang.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Pengiriman</Col>
                  <Col>Rp {keranjang.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Pajak</Col>
                  <Col>Rp {keranjang.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Jumlah</Col>
                  <Col>Rp {keranjang.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={keranjang.cartItems === 0}
                    onClick={placeOrderHandler}>
                    PLACE ORDER
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen