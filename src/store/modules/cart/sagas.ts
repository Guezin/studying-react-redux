import { all, takeLatest } from 'redux-saga/effects'

const checkProductStock = () => {
  console.log('Add to cart')
}

export default all([
  takeLatest('ADD_PRODUCT_TO_CART', checkProductStock),
])