import React, {useState} from 'react'
import Helmet from '../components/Helmet'
import InfoUser from '../components/InfoUser'

import {  useSelector } from 'react-redux';
import { selectAuth } from '../redux/user/userSlice';
import Order from '../components/Order';
const User = () => {
    
    // const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

    // console.log("itemmmmm", items)
    const {user} = useSelector(selectAuth)
    const [activeMenu, setActiveMenu] = useState('user')

  return (
    <Helmet title='Tài khoản'>
        <div className='user'>
            <div className="user__container">
                <div className="user__container__menu">
                    <div className="user__container__menu__title">
                        <span>Nguyen Viet Long</span>
                    </div>
                    <div className={`user__container__menu__item ${activeMenu === 'user' ? 'active-item' : ''}`} onClick={()=>setActiveMenu('user')}>
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div className={`user__container__menu__item ${activeMenu === 'order' ? 'active-item' : ''}`} onClick={()=>setActiveMenu('order')}>
                        <span>Danh sách đơn hàng</span>
                    </div>
                    <div className={`user__container__menu__item ${activeMenu === 'logout' ? 'active-item' : ''}`} onClick={()=>setActiveMenu('logout')}>
                        <span>Đăng xuất</span>
                    </div>
                </div>
                <div className="user__container__content">
                    <div className="user__container__content__item" style={{display: `${activeMenu === 'user' ? 'block' : 'none'}`}}>
                        <div className="user__container__content__item__title">
                            Thông tin tài khoản
                        </div>
                        <InfoUser />
                    </div>
                    <div className="user__container__content__item" style={{display: `${activeMenu === 'order' ? 'block' : 'none'}`}}>
                        <div className="user__container__content__item__title">
                            Danh sách đơn hàng
                        </div>
                        <Order />
                    </div>
                </div>
            </div>
        </div>
    </Helmet>
  )
}

export default User