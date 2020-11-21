import { Reducer } from 'redux'
import produce from 'immer'

import { ICartState } from './types'

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      case 'ADD_PRODUCT_TO_CART_SUCCESS': {
        const { product } = action.payload;

        const productInCart = draft.items.findIndex(item => item.product.id === product.id);
        
        if (productInCart >= 0) {
          draft.items[productInCart].quantity++
        } else {
          draft.items.push({
            product,
            quantity: 1
          })
        }

        break

        // return {
        //   ...state,
        //   items: [
        //     ...state.items,
        //     {
        //       product,
        //       quantity: 1
        //     }
        //   ]
        // }
      }
      case 'ADD_PRODUCT_TO_CART_FAILURE': {
        draft.failedStockCheck.push(action.payload.productId);

        break
      }
      default: {
        return draft
      }
    }
  }) 
}

export default cart