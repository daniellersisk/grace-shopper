import axios from 'axios'
import history from '../history'
import { setOrder } from '.'

/**
 * ACTION TYPES
 */
const UPDATE_CART_TOTAL = 'UPDATE_CART_TOTAL'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  cartTotal: 0
}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({ type: SET_CART, cart })
export const updateCartTotal = () => {
  return { type: UPDATE_CART_TOTAL }
}

/**
 * THUNK CREATORS
 */
export const getInitialCartThunk = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/cart')
    const gotCart = res.data
    dispatch(setCart(gotCart))
  }
}
export const setCartThunk = (cartItem) => {
  return async (dispatch) => {
    const res = await axios.post('/api/cart', cartItem)
    const newCart = res.data
    await dispatch(setCart(newCart))
  }
}
export const addToCartThunk = cartItem => {
  return async dispatch => {
    const res = await axios.post('/api/cart/add', cartItem)
    const newCart = res.data
    dispatch(setCart(newCart))
  }
}
export const removeCartItemThunk = (productId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/cart/${productId}`)
    const newCart = res.data
    dispatch(setCart(newCart))
  }
}
export const checkoutThunk = () => {
  return async (dispatch) => {
    const res = await axios.post('/api/cart/checkout')
    const newCart = res.data.cart
    const orderInfo = res.data.orderInfo
    dispatch(setCart(newCart))
    dispatch(setOrder(orderInfo))
  }
}
export const loginMergeCartThunk = () => {
  return async (dispatch) => {
    const res = await axios.put('/api/cart/merge')
    const newCart = res.data
    dispatch(setCart(newCart))
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
  case SET_CART:
    const calcTotal = state.cart.reduce((total, item) => {
      total += item.quantity * item.product.price
      return total
    }, 0)
    const cartTotal = Math.round(calcTotal * 100) / 100
    return {
      ...state,
      cart: action.cart,
      cartTotal
    }
  default:
    return state
  }
}
