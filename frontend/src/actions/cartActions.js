import axios from 'axios'
import {
  KERANJANG_ADD_ITEM,
  KERANJANG_REMOVE_ITEM,
  KERANJANG_SAVE_PAYMENT_METHOD,
  KERANJANG_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: KERANJANG_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().keranjang.cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: KERANJANG_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().keranjang.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: KERANJANG_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: KERANJANG_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}