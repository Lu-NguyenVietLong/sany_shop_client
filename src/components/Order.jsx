import React from 'react'
import { Icon } from '@iconify/react';

const Order = () => {
  return (
    <div className='order'>
        <div className='order__menu'>
            <div className='order__menu__item active-menu'><span>Đang xử lí</span></div>
            <div className='order__menu__item'><span>Đã hoàn tất</span></div>
        </div>
        <div className='order__products'>
            <div className='order__products__item'>
                <div className="order__products__item__state">
                    <div className="order__products__item__state__code">
                        <span>Đơn hàng</span>
                        <span className="order__products__item__state__code__item">#315315</span>
                    </div>
                    <div className="order__products__item__state__delivery">
                        <span>Đang vận chuyển</span>
                        <span><Icon icon="material-symbols:chevron-right" /></span>
                    </div>
                </div>
                <div className="order__products__item__content">
                    <div className="order__products__item__content__image">
                        <img src='http://web-api-chuthuong.herokuapp.com/public/products/20220503065602-ao-hoodie-5-1.jpg' alt='' />
                    </div>
                    <div className="order__products__item__content__info">
                        <div className="order__products__item__content__info__name">
                                <span>MLB</span>
                                <p>Black/M</p>
                        </div>
                        <div className="order__products__item__content__info__bottom">
                            <div className="order__products__item__content__info__bottom__quantity">
                                <span>3 sản phẩm</span>
                            </div>
                            <div className="order__products__item__content__info__bottom__price">
                                <span>10,228,333đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order