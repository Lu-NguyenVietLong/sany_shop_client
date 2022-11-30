import React, {useState} from 'react'
import PropTypes from 'prop-types'
import numberWithCommas from '../utils/numberWithCommas'
import { Icon } from '@iconify/react';
import des1 from '../assets/des1.jpg'
import cartApi from '../api/cartApi';
import { useDispatch, useSelector } from 'react-redux'
import {  addItemToCart, setCart } from '../redux/cart/cartItemsSlice'
import { selectAuth } from '../redux/user/userSlice'
import { toast } from 'react-toastify';

const ProductView = ({product}) => {
    const {user } = useSelector(selectAuth)
    const [prevImg, setPrevImg] = useState(product.images[0])
    const [colorList, setColorList] = useState(product.detail[0])
    const [size, setSize] = useState(product.detail[0])
    const [color, setColor] = useState()
    const [shiftActive, setShiftActive] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    console.log("Props product: ",product)



    const activeSize = (size) => {
        setSize(size)
    }

    const activeColor = (detailColorName) => {
        setColor(detailColorName)
    }

    const findColor = (sizeId) => {
        setColorList(product.detail.find(size => (size._id === sizeId)))
    }

    const handleDes = () => setShiftActive(!shiftActive)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            if (typeof color !== 'undefined'){
                setQuantity(quantity+1 > color.amount ? color.amount : quantity+1)
            } else {
                setQuantity(quantity+1)
            }
            
        }
        if (type === 'minus') {
            setQuantity(quantity - 1 < 1 ? 1 : quantity-1)
        }
        if (type === '') {
            if (typeof color !== 'undefined') {
                if (quantity > color.amount) {
                    setQuantity(color.amount)
                }
            }
        }
    }
    const handleAddToCart = async()=> {
        
        if(user) {
            if(color) {
                try {
                    const res =await cartApi.addToCart({product: product._id, color: color.color, size:size.size, quantity: 1})
                    console.log(res);
                    if(res) {
                        toast.success(res.message)
                        dispatch(setCart({cartItems: res.cart.cartItems}))
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }else {
            const newCartItem = {
                product: product,
                quantity: 1,
                color: color.color, size:size.size,
            }
            dispatch(addItemToCart(newCartItem))
        }
        
        
    }
    console.log("   quantity: ",quantity)
    console.log('size', size);

    const addToCart = () => {
        let newItem = {
            product: product._id,
                color: color,
                size: size,
                quantity: quantity,
            }
            dispatch(addItemToCart(newItem))
            
    }

  return (
    <div className="product">
        <div className="product__images">
            <div className="product__images__list">
                    {
                        product.images.map((image) => (
                        <div key={image._id} className={`product__images__list__item  ${prevImg._id === image._id ? 'active' : ''}`} onClick={()=>setPrevImg(image)}>

                            <img src={image.img} key={image._id} alt='' />
                        </div>
                        ))
                    }
            </div>
            <div className="product__images__main">
                <img src={prevImg.img} alt='' />
            </div>
        </div>
        <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price-(product.price*product.discount/100))}đ
                    </span>
                    <del className="product__info__item__price--old">{numberWithCommas(product.price)}đ</del>
                    <span className="product__info__item__price--discount">
                        {product.discount}%
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích thước:
                    </div>
                    <div className="product__info__item__list">
                        {
                            typeof product !== 'undefined' && size._id !=='undefined'? product.detail.map(detail => (
                                <div className={`product__info__item__list__item ${size._id === detail._id ? 'active-size' : ''}`} key={detail._id} onClick={() => {
                                    findColor(detail._id)
                                    activeSize(detail)
                                    }}>
                                    {detail.size}
                                </div>
                            )): <div>Chưa có thông tin về size</div>
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc:
                    </div>
                    <div className="product__info__item__list">
                
                                    {
                                        typeof colorList !== 'undefined' ? colorList.detailColor.map(detailColor => (
                                            <div className={`product__info__item__list__item--color ${detailColor.color} ${color
                                             === detailColor ? 'active-color' : ''}`} key={detailColor._id} onClick={() => {
                                                activeColor(detailColor)
                                                updateQuantity('')
                                             }}>
                                                <span>{detailColor.color}</span>
                                                <span className="background-image-color effect"></span>
                                            </div>
                                        )) : <div className="product__info__item__list__item--color">Chưa có thông tin về màu sắc</div>
                                    }
                        
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__list">
                        <div className="product__info__item__list__quantity">
                            <div className="product__info__item__list__quantity__reduce" onClick={() => updateQuantity('minus')}>-</div>

                            {typeof color === 'undefined' ? <input type='number'  value={`${quantity}`} max="100"  min="1" className="product__info__item__list__quantity__control" /> : <input type='number' value={`${quantity}`} max={`${color.amount}`} min="1" className="product__info__item__list__quantity__control"  /> }
                            <div className="product__info__item__list__quantity__reduce" onClick={() => updateQuantity('plus')}>+</div>
                        </div>
                        <div className='product__info__item__list__button' onClick={handleAddToCart}>
                            <Icon icon="bx:cart-add" className="icon"/>
                            {typeof color !== 'undefined'  ? <p>Thêm vào giỏ hàng</p> : <p>Chọn màu sắc</p> }
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item product__info__item--des1">
                        <img src={des1} alt="" />
                    </div>
                </div>

                
                <div className="product__info__item">
                    <div className="product__info__item product__info__item--des">
                                <div className="product__info__item--des__title"><p>Mô tả</p> {shiftActive ? <Icon icon="akar-icons:minus" onClick={handleDes} /> : <Icon icon="ant-design:plus-outlined" className="icon--plus" onClick={handleDes} />}</div>
                                <div className={`product__info__item--des__content ${shiftActive ? 'shift' : ''}`}><span>{product.desProduct}</span></div>
                    </div>
                </div>
        </div>
    </div>
  )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductView