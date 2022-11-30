import React from 'react'

import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Product from '../pages/Product'
import User from '../pages/User'

const Routess = () => {
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Catalog' element={<Catalog />} />
        <Route path='/category/:slug' element={<Product/>} />
        <Route path='/user' element={<User />} />
      </Routes>
  )
}

export default Routess