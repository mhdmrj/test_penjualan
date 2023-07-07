import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Form, Dropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { keluar } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(keluar())
  }

  const productHandler = () => {
    navigate('/admin/productlist')
  }

  const orderHandler = () => {
    navigate('/admin/orderlist')
  }

  return (
    <header>
      <Navbar className="navBg" expand="lg">
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand className="fas fa-store">{' '}&nbsp;APP PENJUALAN</Navbar.Brand>
          </LinkContainer>          
          <Navbar.Toggle aria-controls="navbarScroll" />          
          <Navbar.Collapse id="navbarScroll">                  
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
            </Nav>
            <Form className="d-flex">
              <LinkContainer to='/keranjang'>
                <Button
                  className='fas fa-shopping-cart'
                  variant="outline-warning">
                  <span className='hide-sm'>{' '}&nbsp;KERANJANG</span>
                </Button>
              </LinkContainer>
              {' '}&nbsp;&nbsp;
              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle className='fas fa-user' variant="outline-warning" id='username'>
                    <span className='hide-sm'> &nbsp;{userInfo.name.toUpperCase()}</span>
                  </Dropdown.Toggle>

                  <LinkContainer to='/profile'>
                    <Dropdown.Menu>
                      <Dropdown.Item href='/profile'>Profil</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler}>keluar</Dropdown.Item>
                    </Dropdown.Menu>
                  </LinkContainer>

                </Dropdown>
              ) : (
                <LinkContainer to='/masuk'>
                  <Button className='fas fa-sign-in-alt' variant="outline-warning"><span className='hide-sm'>{' '}&nbsp;MASUK</span>
                  </Button>
                </LinkContainer>
              )}
              {' '}&nbsp;&nbsp;
              {userInfo && userInfo.isAdmin && (
                <Dropdown >
                  <Dropdown.Toggle className='fas fa-user-shield' variant="outline-warning" id='admin'>
                    <span className='hide-sm'> &nbsp;ADMIN</span>
                  </Dropdown.Toggle>

                  <LinkContainer to='/admin/userlist'>
                    <Dropdown.Menu>
                      <Dropdown.Item href='/admin/userlist'>Pengguna</Dropdown.Item>
                      <Dropdown.Item onClick={productHandler}>Produk</Dropdown.Item>
                      <Dropdown.Item onClick={orderHandler}>Semua Pesanan</Dropdown.Item>
                    </Dropdown.Menu>
                  </LinkContainer>
                </Dropdown>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header