import { createStore } from "redux"

function reducer(state = { cart: [] }, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: state.cart.concat(action.payload) }
    case "REMOVE_PRODUCT":
      const cart = state.cart.filter((product) => product._id !== action.payload)
      return { ...state, cart }
    case "CLEAR_CART":
      return { cart: [] }
    default:
      return state
  }
}

export default createStore(reducer)
