import React, { useState} from 'react';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import authApi from '../api/authApi';
import  {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setCredentials } from '../redux/user/userSlice';
import cartApi from '../api/cartApi';
import { setCart } from '../redux/cart/cartItemsSlice';
const initStateInput = {
  username: '',
  password: '',
  email: ''
}
const SignIn = ({activeModal, closeModal}) => {
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch()
  const [activeSign, setActiveSign] = useState(true)
  const [inputCredentials, setInputCredentials] = useState(initStateInput)
  const handleSign = () => {
    setActiveSign(!activeSign)
  }
  useEffect(() => {
    // window.addEventListener('scroll', (event) => {
    //   closeModal()
    // });
    // return ()=> window.removeEventListener('scroll',(event) => {
    //   closeModal()
    // })
  }, [])
  useEffect(() => {
    if(!activeModal) {
      setInputCredentials(initStateInput)
    }
  }, [activeModal])
  const handleLogin = async(e)=> {
    e.preventDefault()
    try {
        const res =await authApi.login({username: inputCredentials.username, password: inputCredentials.password})
        const {accessToken, refreshToken, ...other} = res
        dispatch(setCredentials({
          user: other,
          token: {
            accessToken,refreshToken
          }
        }))
        setInputCredentials(initStateInput)
        toast.success('Đăng nhập thành công')
        
        closeModal()
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }
  const handleRegister = async(e)=> {
    e.preventDefault()
    try {
        const res =await authApi.register(inputCredentials)
        if(res) {
          setInputCredentials(initStateInput)
          toast.success('Đăng kí thành công')
        alert(res.message)
          setActiveSign(true)
        }
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }
  const handleChangeInput = (e)=> {
    setInputCredentials((prev)=> ({...prev, [e.target.name]: e.target.value}))
  }
  // console.log(inputCredentials);
  console.log(auth);
  return (
    <div className='sign-in-up' style={{display: `${activeModal=== true ? 'block' : 'none'}`}}>
      <div className="sign-in-up__backdrop">

      </div>
      {/* Sign In */}
      <div className='sign-in-up__container' style={{display: `${activeSign=== true ? 'block' : 'none'}`}}>
          <span className="sign-in-up__container__close" onClick={closeModal}><Icon icon="bytesize:close"/></span>

          <div className="sign-in-up__container__wrapper">
            <div>
              <div className="sign-in-up__container__wrapper__heading">
                <span>Đăng nhập</span>
              </div>
              <div className="sign-in-up__container__wrapper__input">
                <input type="text" onChange={handleChangeInput} value={inputCredentials.username}  name="username" placeholder="Tên đăng nhập của bạn"/>
              </div>
              <div className="sign-in-up__container__wrapper__input">
                <input type="password" onChange={handleChangeInput} value={inputCredentials.password}  name="password" placeholder="Mật khẩu" />
              </div>
              <button onClick={handleLogin} className='sign-in-up__container__wrapper__button'>Đăng nhập</button>
              <div className='sign-in-up__container__wrapper__action'>
                <a href="#" onClick={handleSign} >Đăng ký tài khoản mới</a>
                <a href="#">Quên mật khẩu</a>
              </div>
            </div>
          </div>
      
      </div>




      



      {/* Sign up  */}
      <div className='sign-in-up__container' style={{display: `${activeSign=== false ? 'block' : 'none'}`}} >
          <span className="sign-in-up__container__close"><Icon icon="bytesize:close"/></span>

          <div className="sign-in-up__container__wrapper">
            <div>
              <div className="sign-in-up__container__wrapper__heading">
                <span>Đăng kí</span>
              </div>
              <div className="sign-in-up__container__wrapper__input">
                <input type="text" onChange={handleChangeInput} value={inputCredentials.username}  name="username" placeholder="Tạo tên đăng nhập"/>
              </div>
              <div className="sign-in-up__container__wrapper__input">
                <input type="email" onChange={handleChangeInput}  name="email" value={inputCredentials.email} placeholder="Nhập email của bạn" />
              </div>
              <div className="sign-in-up__container__wrapper__input">
                <input type="password" onChange={handleChangeInput}  name="password" value={inputCredentials.password} placeholder="Tạo mật khẩu" />
              </div>
              <button onClick={handleRegister} className='sign-in-up__container__wrapper__button'>Đăng kí</button>
              <div className='sign-in-up__container__wrapper__action'>
                <a href="#" onClick={handleSign}>Đã có tài khoản</a>
              </div>
            </div>
          </div>
      
      </div>
    </div>
  )
}

export default SignIn