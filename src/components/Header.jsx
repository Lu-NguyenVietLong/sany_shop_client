import React, { useRef, useEffect  } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../assets/sany-logo.png'
import { Icon } from '@iconify/react';

import TopBar from './TopBar';
import SignIn from '../pages/SignIn';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../redux/user/userSlice';
import { selectCartItems, setCart } from '../redux/cart/cartItemsSlice';
import cartApi from '../api/cartApi';
import numberWithCommas from '../utils/numberWithCommas';


const mainNav = [
  {
      display: "Trang chủ",
      path: "/"
  },
  {
      display: "Sản phẩm",
      path: "/Catalog"
  },
  {
      display: "Phụ kiện",
      path: "/#"
  },
  {
      display: "Liên hệ",
      path: "/##"
  }
]

const Header = () => {
  const {user} = useSelector(selectAuth) // {user, token}
  const cart = useSelector(selectCartItems)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeLogin, setActiveLogin] = useState(false)
  const activeNav = mainNav.findIndex(e => e.path === pathname)
  const headerRef = useRef(null)
  const menuLeft = useRef(null)
  useEffect(() => {
      window.addEventListener("scroll", () => {
          if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80 ) {
              headerRef.current.classList.add('shrink')
          } else {
              headerRef.current.classList.remove('shrink')
          }
      })
      
 
    return () => {
      window.removeEventListener("scroll", null)

  };
  }, []);
  useEffect(() => {
         const fetchMyCart = async () => {
        try {
            const res = await cartApi.getMyCart();
            if (res) {
                console.log(res);
                dispatch(setCart({cartItems: res.cart.cartItems}))
            }
        } catch (error) {
            console.log('Failed: ', error);
        }
    };
    fetchMyCart();
  }, [user])
  const menuToggle = () => menuLeft.current.classList.toggle('active')

  const handleActiveLogin = ()=> {
    !user && setActiveLogin(true)
    user && navigate('/user')
  }

  return (
    <div className="site-header" ref={headerRef}>
      <TopBar/>
      <SignIn activeModal={activeLogin} closeModal={()=> setActiveLogin(false)}/>
      <div className="header">

        <div className="header__menu__mobile--toggle " >
          <div className='header__menu__mobile--toggle__container' ref={menuLeft}  onClick={menuToggle}>
            <Icon icon="bx:menu" className="header__menu__mobile--toggle__container__btn"/>
          </div>
 
        </div>
        <div className="header__logo">
          <Link to='/' >
            <img src={logo} alt='' />
          </Link>
        </div>
        <div className="header__menu__center" ref={menuLeft}>
          <div className='header__menu__center__close'  onClick={menuToggle} >
            <Icon icon="eva:arrow-ios-back-fill" className="header__menu__mobile--toggle__container__btn"/>
          </div>
          {
            mainNav.map((item, index) => (
              <div
                key={index}
                className="header__menu__center__item"
                onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <p className={`header__menu__center__item__title ${index === activeNav ? 'header__menu__center__item__title--active' : ''}`}>{item.display}</p>
                  </Link>
              </div>
            ))
          }
        </div>
        <div className="header__menu__right">
          <div className="header__menu__right__item header__menu__right__search">
            <a href="#" >
              <img src="https://www.coolmate.me/images/header/icon-search.svg" />
            </a>
          </div>
          <div className="header__menu__right__item" onClick={handleActiveLogin}>
            <a href="#" >
              <img src="https://www.coolmate.me/images/header/icon-account.svg" />
            </a>
          </div>
          <div className="header__menu__right__item cart-container">
            <Link to='/Cart' >
              <img src="https://www.coolmate.me/images/header/icon-cart.svg"  />
            </Link>
            <span className="header__menu__right__item__count">{cart?.length}</span>
            <div className='cart-container__info'>
              <div className='cart-container__info__content'>
                <div className='cart-container__info__content__title'>
                  <span>{cart?.length} Sản phẩm</span>
                  <Link to='/cart'>Xem tất cả</Link>
                </div>
                <div className='cart-container__info__content__cart'>
                  {
                    cart ? cart.map(cartItem => (
                      <div className='cart-container__info__content__cart__item' key={cartItem._id}>
                        <div className='cart-container__info__content__cart__item__image'>
                          <img src={cartItem.product.images[0].img} alt='' />
                        </div>
                        <div className='cart-container__info__content__cart__item__info'>
                          <div className='cart-container__info__content__cart__item__info__name'>
                            <span>{cartItem.product.name}</span>
                            <p>{cartItem.color}/{cartItem.size}</p>
                          </div>
                          <div className='cart-container__info__content__cart__item__info__bottom'>
                            <p>X{cartItem.quantity}</p>
                            <span>{numberWithCommas(
                                (cartItem.product.price -
                                    (cartItem.product.price *
                                        cartItem.product.discount) /
                                        100) *
                                    cartItem.quantity,
                            )}đ</span>
                          </div>
                        </div>
                      </div>
                    )) : <div></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header