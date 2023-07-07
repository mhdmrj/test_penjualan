import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const { id } = useParams()
  const userId = id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }

  }, [user, dispatch, userId, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({
      _id: userId, name, email, isAdmin
    }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Kembali
      </Link>

      <FormContainer>
        <h1>Edit Pengguna</h1>
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

            <Form.Group controlId='isadmin' className='py-2'>
              <Form.Check
                type='checkbox'
                label='Saya Admin'
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              >
              </Form.Check>
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

export default UserEditScreen