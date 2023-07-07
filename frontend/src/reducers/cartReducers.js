import {
  KERANJANG_ADD_ITEM,
  KERANJANG_REMOVE_ITEM,
  KERANJANG_SAVE_PAYMENT_METHOD,
  KERANJANG_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case KERANJANG_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case KERANJANG_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    case KERANJANG_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }

      case KERANJANG_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }

    default:
      return state
  }
}