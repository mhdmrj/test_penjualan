import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const { id } = useParams()
  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [product, dispatch, productId, navigate, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)

    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }

  const inputElement = document.getElementById('file') || document.createElement('inputElement')
  const labelElement = document.getElementById('file-name')
  inputElement.onchange = function (event) {
    var path = inputElement.value;
    if (path) {
      labelElement.innerHTML = path.split(/(\\|\/)/g).pop()
    } else {
      labelElement.innerHTML = ''
    }
  }


  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Kembali
      </Link>

      <FormContainer>
        <h1>EDIT PRODUK</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

            <Form.Group controlId='price' className='py-2'>
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type='number'
                placeholder='Masukan harga'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='py-2'>
              <Form.Label>Gambar</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukan URL Gambar'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              >
              </Form.Control>

              <input
                type="button"
                id="click-input"
                value="Unggah file"
                onClick={() => document.getElementById('file').click()}
                className='custom-file-input'
              />
              {' '} &nbsp;
              <label
                htmlFor="click-input"
                id="file-name">
                File gambar belum di masukkan
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={uploadFileHandler}
              />

              {uploading && <Loader />}

              <Form.Group>
              </Form.Group>
            </Form.Group>

            <Form.Group controlId='brand' className='py-2'>
              <Form.Label>Merek</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukan merek'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='py-2'>
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type='number'
                placeholder='Masukan stok'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='py-2'>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukan kategori'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='py-2'>
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukan deskripsi'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
              </Form.Control>
            </Form.Group>


            <div className='py-2'>
              <Button type='submit' variant='primary' >Perbaharui</Button>
            </div>
          </Form>
        )}

      </FormContainer>
    </>
  )
}

export default ProductEditScreen