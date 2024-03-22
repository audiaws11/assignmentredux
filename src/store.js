import { createStore, combineReducers} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';


const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
})

const store = createStore(
  rootReducer, 
  composeWithDevTools())

export default store;
