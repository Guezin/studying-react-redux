import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '../services/api';
import { addProductToCart } from '../store/modules/cart/actions';

import { IProduct } from '../store/modules/cart/types';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([])
  
  const dispatch = useDispatch()


  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product))
  }, [dispatch])

  useEffect(() => {
    api.get('/products').then(response => {
      setCatalog(response.data);
    })
  }, [])

  return (
    <>
      <h1>Catalog</h1>

      {catalog.map(product => (
        <article key={product.id}>
          <strong>{product.title}</strong> {' - '}
          <span>{product.price}</span> {' '}

          <button type="button" onClick={() => handleAddProductToCart(product)}>Comprar</button>
        </article>
      ))}
    </>
  )
}

export default Catalog