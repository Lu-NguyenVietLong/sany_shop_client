import React, { useState, useEffect } from 'react';

import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import cartApi from '../api/cartApi';
import { Link } from 'react-router-dom';
import numberWithCommas from '../utils/numberWithCommas';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCart, increaseCart, removeItemFromCart, selectCartItems, setCart } from '../redux/cart/cartItemsSlice';
import { updateItem } from '../redux/cart/cartItemsSlice';
import { selectAuth } from '../redux/user/userSlice';
import orderApi from '../api/orderApi';
import {toast} from 'react-toastify'


const Cart = () => {
    const { user } = useSelector(selectAuth);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    console.log('redux Cart', cartItems);

    const [activeDelivery, setActiveDelivery] = useState(false);
    const [myCartApi, setMyCartApi] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [tinhList, setTinhList] = useState();
    const [tinh, setTinh] = useState();
    const [huyenList, setHuyenList] = useState();
    const [huyen, setHuyen] = useState();
    const [xaList, setXaList] = useState();
    const [xa, setXa] = useState();
    const [delivery, setDelivery] = useState(0);

    const [fullName, setFullName] = useState('')
    const [numberPhone, setNumberPhone] = useState()
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const handleDelivery = () => {
        setActiveDelivery(true);
    };

    const removeItemApi = async (id) => {
        try {
            console.log('id', id);
            const res = await cartApi.removeItem(id);
            console.log(res);
            if (res.cart) {
                dispatch(setCart({ cartItems: res.cart.cartItems }));
            } else {
                // nếu mà xóa item cuối thì api sẽ xóa luôn cart, và dispatch cartItem thành mảng rỗng
                dispatch(setCart({ cartItems: [] }));
            }
        } catch (error) {
            console.log('Failed: ', error);
        }
    };

    const handleUpdateHuyen = (e) => {
        setTinh(e.target.value)
        const huyentemp = tinhList.find((tinhs) => tinhs.name === e.target.value);
        setHuyenList(huyentemp.districts);
        if (e.target.value === 'Thành phố Hồ Chí Minh') {
            setDelivery(0);
        } else {
            setDelivery(25000);
        }
    };

    const handleUpdateXa = (e) => {
        setHuyen(e.target.value)
        const xatemp = huyenList.find((huyens) => huyens.name === e.target.value);
        setXaList(xatemp.wards);
    };

    const handleUpdateXaItem = e => {
        setXa(e.target.value)
    }

    useEffect(() => {
        const fetchMyCart = async () => {
            try {
                const res = await cartApi.getMyCart();
                if (res) {
                    setMyCartApi(res.cart);
                    console.log("cartAPi,", myCartApi);
                }
            } catch (error) {
                console.log('Failed: ', error);
            }
        };

        fetchMyCart();
    }, []);

    useEffect(()=> {
        setTotalPrice(cartItems.reduce((total, item) => total +((item.product.price - (item.product.price * (item.product.discount / 100))) * item.quantity),0))
    }, [cartItems])

    useEffect(() => {
        const fetchAddress = async () => {
            await axios
                .get(`https://provinces.open-api.vn/api/?depth=3`)
                .then((res) => {
                    const data = res.data;
                    console.log('Address', data);
                    setTinhList(data);
                })
                .catch((error) => console.log(error));
        };
        fetchAddress();
    }, []);
    // handle empty cart
    const handleRemoveItemFromCart = (cartItem) => {
        if (user) {
            dispatch(removeItemFromCart(cartItem));
            removeItemApi(cartItem._id); 
        } else {
            dispatch(removeItemFromCart(cartItem));
        }
    };
    const handleInCreaseCart = async (cartItem) => {
        if (user) {
            dispatch(increaseCart(cartItem));

            const res = await cartApi.updateItem(cartItem._id, cartItem.size, cartItem.color, cartItem.quantity + 1 )
            // dispatch(setCart({ cartItems: res.cart.cartItems }));
        } else {
            dispatch(increaseCart(cartItem));
        }
    };
    const handleDecreaseCart = async (cartItem) => {
        if (user) {
            // call api update quantity rồi dispatch lại redux
            dispatch(decreaseCart(cartItem));
            // khi setCart thì luôn truyền vào {cartItems}
            const res = await cartApi.updateItem(cartItem._id, cartItem.size, cartItem.color, cartItem.quantity - 1 )
            // dispatch(setCart({ cartItems: res.cart.cartItems }));
        } else {
            dispatch(decreaseCart(cartItem));
        }
    };
    
    const handleUpdateFullName = (e) => {
        setFullName(e.target.value)
        console.log('fullName',fullName);
    }

    const handleUpdateNumberPhone = e => {
        setNumberPhone(e.target.value)
    }
    
    const handleUpdateEmail = e => {
        setEmail(e.target.value)
    }
    const handleUpdateAddress = e => {
        setAddress(e.target.value)
    }

    const newOrder = async () => {
        if (!fullName){
          toast.info('Vui lòng kiểm tra họ tên !');
        }
        if (!numberPhone){
            toast.info('Vui lòng kiểm tra số điện thoại !');
        }
        if (!tinh || !huyen || !xa){
            toast.info('Vui lòng kiểm tra địa chỉ !');
        }
        if (!address){
            toast.info('Vui lòng kiểm tra địa chỉ nhà !');
        }
        if(!activeDelivery){
            toast.info('Vui lòng chọn hình thức giao hàng !');
        }
        if (fullName && numberPhone && tinh && huyen && xa && address && activeDelivery) {
            console.log({fullName, numberPhone, tinh, huyen, xa, address})
            const res = await orderApi.newOrder({fullName, numberPhone, tinh, huyen, xa, address})
            toast.info('Đặt hàng thành công');
        }
    }
    return (
        <Helmet title="Giỏ hàng">
            <div className="cart-site">
                <div className="cart-site__order">
                    <div className="cart-site__order__section">
                        <div className="cart-site__order__section__title">
                            <span>Thông tin vận chuyển</span>
                        </div>
                        <div className="cart-site__order__section__info">
                            <Grid col={2} mdCol={2} smCol={1} gap={5}>
                                <div className="cart-site__order__section__info__input twice">
                                    <input type="text" onChange={e => handleUpdateFullName(e)} name="name" placeholder="Họ tên" />
                                </div>
                                <div className="cart-site__order__section__info__input twice">
                                    <input type="text" onChange={e => handleUpdateNumberPhone(e)} name="phone" placeholder="Số điện thoại" />
                                </div>
                            </Grid>
                            <Grid col={1} mdCol={1} smCol={1} gap={5}>
                                <div className="cart-site__order__section__info__input">
                                    {myCartApi ? (
                                        <input type="text" value={myCartApi.user.email} />
                                    ) : (
                                        <input type="text"  onChange={e => handleUpdateEmail(e)} />
                                    )}
                                </div>
                                <div className="cart-site__order__section__info__input">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Địa chỉ(ví dụ: 69 Nguyễn Gia Trí, phường 25)"
                                        onChange={e => handleUpdateAddress(e)}
                                    />
                                </div>
                            </Grid>
                            <Grid col={3} mdCol={3} smCol={3} gap={5}>
                                <div className="cart-site__order__section__info__input">
                                    <select onChange={(e) => handleUpdateHuyen(e)}>
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {tinhList ? (
                                            tinhList.map((Tinh) => (
                                                <option key={Tinh.code} value={Tinh.name}>
                                                    {Tinh.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                                <div className="cart-site__order__section__info__input">
                                    <select onChange={(e) => handleUpdateXa(e)}>
                                        <option>Chọn Quận/Huyện</option>
                                        {huyenList ? (
                                            huyenList.map((huyen) => <option value={huyen.name}>{huyen.name}</option>)
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                                <div className="cart-site__order__section__info__input">
                                    <select onChange={e=>handleUpdateXaItem(e)}>
                                        <option>Chọn Phường/Xã</option>
                                        {xaList ? (
                                            xaList.map((xa) => <option value={xa.name}>{xa.name}</option>)
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                            </Grid>
                            <Grid col={1} mdCol={1} smCol={1} gap={5}>
                                <div className="cart-site__order__section__info__input">
                                    <input type="text" placeholder="Ghi chú thêm(Ví dụ: Giao hàng giờ hành chính)" />
                                </div>
                            </Grid>
                        </div>
                    </div>
                    <div className="cart-site__order__section">
                        <div className="cart-site__order__section__title">
                            <span>Hình thức giao hàng</span>
                        </div>
                        <div className="cart-site__order__section__info">
                            <label className={`${activeDelivery === true ? 'active-cod' : ''}`}>
                                <span onClick={handleDelivery}>
                                    <input type="radio"></input>
                                </span>
                                <span>
                                    <img src="https://www.coolmate.me/images/COD.svg" alt="" />
                                </span>
                                <span>Thanh toán khi nhận hàng</span>
                            </label>
                        </div>
                        <div className="cart-site__order__section__info">
                            <p className="cart-site__order__section__info__note">
                                Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có thể trả lại sản
                                phẩm.
                            </p>
                            <button className="cart-site__order__section__info__button" onClick= {newOrder}>
                                Thanh toán ({numberWithCommas(totalPrice + delivery)}đ)
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cart-site__cart">
                    {cartItems.length > 0 ? (
                        // render cart here
                        <div className="cart-site__cart__section">
                            <div className="cart-site__cart__section__title">
                                <span>Giỏ hàng</span>
                            </div>
                            {/* đó là gì là nó đó,  */}
                            {cartItems.map((cartItem) => (
                                <div className="cart-site__cart__section__item">
                                    <span
                                        class="cart-site__cart__section__item__remove"
                                        onClick={() => handleRemoveItemFromCart(cartItem)}
                                    >
                                        X
                                    </span>
                                    <div className="cart-site__cart__section__item__image">
                                        <img src={cartItem.product.images[0].img} alt="" />
                                    </div>
                                    <div className="cart-site__cart__section__item__content">
                                        <div className="cart-site__cart__section__item__content__info">
                                            <div className="cart-site__cart__section__item__content__info__container">
                                                <Link>
                                                    <h3>{cartItem.product.name}</h3>
                                                </Link>
                                                <div className="cart-site__cart__section__item__content__info__container__variant">
                                                    {cartItem.color}/{cartItem.size}
                                                </div>

                                                <div className="cart-site__cart__section__item__action">
                                                    <div></div>
                                                    <div className="cart-site__cart__section__item__action__bottom">
                                                        <div className="cart-site__cart__section__item__action__bottom__quantity">
                                                            <button
                                                                className="cart-site__cart__section__item__action__bottom__quantity__minus"
                                                                onClick={()=> handleDecreaseCart(cartItem)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <input type="text" value={cartItem.quantity} />
                                                            <button
                                                                className="cart-site__cart__section__item__action__bottom__quantity__plus"
                                                                onClick={() => handleInCreaseCart(cartItem)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="cart-site__cart__section__item__action__bottom__price">
                                                            <span>
                                                                {numberWithCommas(
                                                                    (cartItem.product.price -
                                                                        (cartItem.product.price *
                                                                            cartItem.product.discount) /
                                                                            100) *
                                                                        cartItem.quantity,
                                                                )}
                                                                đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="cart-site__cart__section__pricing">
                                <div className="cart-site__cart__section__pricing__item">
                                    <span>Tạm tính</span>
                                    <span>{numberWithCommas(totalPrice)}đ</span>
                                </div>
                                <div className="cart-site__cart__section__pricing__item">
                                    <span>Giảm giá</span>
                                    <span>0đ</span>
                                </div>
                                <div className="cart-site__cart__section__pricing__item">
                                    <span>Phí giao hàng</span>
                                    {huyenList ? <span>{numberWithCommas(delivery)}đ</span> : <span>0đ</span>}
                                </div>
                                <div className="cart-site__cart__section__pricing__item">
                                    <span>Tổng</span>
                                    <span>{numberWithCommas(totalPrice + delivery)}đ</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Cart empty</div>
                    )}
                </div>
            </div>
        </Helmet>
    );
};
export default Cart;
