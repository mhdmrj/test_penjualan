import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
  const { id } = useParams()
  const productId = id
  const { pageNumber } = useParams() || 1

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails

  const productDelete = useSelector(state => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/masuk')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else if (!product.name || product._id !== productId) {
      dispatch(listProducts('', pageNumber))
      setCountInStock(product.countInStock)
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Yakin untuk dihapus?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const [countInStock, setCountInStock] = useState(0)

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Master Data Produk</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>  Buat Produk
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAMA</th>
                <th>HARGA</th>
                <th>KATEGORI</th>
                <th>STOK</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    Rp {product.price}
                  </td>
                  <td>
                    {product.category}
                  </td>
                  <td>{product.countInStock}</td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash' />
                  </Button>
                </tr>
              ))}
            </tbody>

          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen