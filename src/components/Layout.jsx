import React from 'react'

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import Routess from '../routes/Routess'
import SignIn from '../pages/SignIn'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <BrowserRouter>
     <ToastContainer autoClose={3000} />
      <Routes>
            <Route path="/*" element={(
                <div>
                    <Header/>
                    <div className="container">
                        <div className="main">
                            <Routess/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}/>
      </Routes>
    </BrowserRouter>
)
}


export default Layout