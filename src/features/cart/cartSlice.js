import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
}



//reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
        case 'cart/increaseToCart':{
                const tempCart = state.cartItems.map((item) => {
                  if (item.id === action.payload.id) {
                    return { ...item, amount: item.amount + 1 };
                  }
                  return item;
                });
                return { ...state, cartItems: tempCart };
              }
        case 'cart/decreaseFromCart':{
            const tempCart = state.cartItems.map((item) => {
              if (item.id === action.payload.id) {
                return { ...item, amount: item.amount - 1 };
              }
              return item;
            });
            return { ...state, cartItems: tempCart };
          }
        case 'cart/getTotal':
            return {
                ...state,
                total: state.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0),
            }
        case 'cart/removeFromCart':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
            }
        case 'cart/clearCart':
            return {
                ...state,
                cartItems: [],
                amount: 0,
                total: 0,
            } 
        default:
            return state  
  }
  }

//action creators
export const increase = (id) => ({
    type: 'cart/increaseToCart',
    payload: {id, amount:1}
})

export const decrease = (id) => ({
    type: 'cart/decreaseFromCart',
    payload: {id, amount:1}
})

export const remove = (id) => ({
    type: 'cart/removeFromCart',
    payload: {id}
})

export const total = (total) => ({
    type: 'cart/getTotal',
    payload: total
})

export const clear = () => ({
    type: 'cart/clearCart'
})

export default cartReducer;
