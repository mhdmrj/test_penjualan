import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { masuk } from '../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(masuk(email, password))
  }

  return (
    <FormContainer>
      <h1>Masuk?</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Alamat Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Masukan email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='py-2'>
          <Form.Label>Kata sandi</Form.Label>
          <Form.Control
            type='password'
            placeholder='Masukan kata sandi'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <div className='py-2'>
          <Button type='submit' variant='primary' >Masuk</Button>
        </div>
      </Form>

      <Row className='py-3'>
        <Col>
          Pelanggan Baru? <Link to={redirect ? `/daftar?redirect=${redirect}` : '/daftar'}>Daftar</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen