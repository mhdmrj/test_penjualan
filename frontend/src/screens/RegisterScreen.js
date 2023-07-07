import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { daftar } from '../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password tidak cocok')
    } else {
      dispatch(daftar(name, email, password))
    }

  }

  return (
    <FormContainer>
      <h1>Daftar</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type='name'
            placeholder='Masukan nama'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='py-2'>
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

        <Form.Group controlId='confirmPassword' className='py-2'>
          <Form.Label>Kata sandi Ulang</Form.Label>
          <Form.Control
            type='password'
            placeholder='Ulangi kata sandi'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <div className='py-2'>
          <Button type='submit' variant='primary' >Daftar</Button>
        </div>
      </Form>

      <Row className='py-3'>
        <Col>
          Sudah punya akun? <Link to={redirect ? `/masuk?redirect=${redirect}` : '/masuk'}>Masuk</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen