import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@iconify/react';
import Button from './Button'

const banner = [
  {
    img: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=100,format=auto/uploads/October2022/Hero-BST-Dong-ppp_21.jpeg',
  },
  {
    img: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=100,format=auto/uploads/October2022/Desktop-Hero-banner-PRMVN.jpg',
  },
  {
    img: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=100,format=auto/uploads/July2022/Banner-Coolmate-Active-opt-1.jpeg'
  },
]

const Slider = props => {
  const timeOut = props.timeOut ? props.timeOut : 3000

  const [activeSlider, setActiveSlider] = useState(0)

  const nextSlider = useCallback(
    () => {
        const index = activeSlider + 1 === banner.length ? 0 : activeSlider + 1
        setActiveSlider(index)
    },
    [activeSlider, banner],
)

const prevSlider = () => {
  const index = activeSlider - 1 < 0 ? banner.length - 1 : activeSlider - 1
  setActiveSlider(index)
}

useEffect(() => {

  const slideAuto = setInterval(() => {
      nextSlider()
  }, timeOut);
  return () => {
      clearInterval(slideAuto)
  }

}, [nextSlider, timeOut, props])

  return (
    <div className="slider">
              
      {banner.map((item, index) => (
        <div className={`slider__item ${activeSlider === index ? 'active' : ''}`}>
          <div className="slider__item__image">
            <img src={item.img} alt='' />
          </div>
        </div>
      ))}
            <div className="slider__gradient">
        
        </div>
      <div className="slider__control">
        <div className="slider__control__item" onClick={prevSlider}>
          <Icon icon="akar-icons:chevron-left" />
        </div>
        <div className="slider__control__item">
          <div className="slider__control__item__index">
            {activeSlider+1}/{banner.length}
          </div>
        </div>
        <div className="slider__control__item" onClick={nextSlider}>
          <Icon icon="akar-icons:chevron-right" />
        </div>
      </div>

      <div className="slider__info">
        <div className="slider__info__wrapper">
          <div className="slider__info__wrapper__item">
            <p>Miễn phí vận chuyển cho</p>
            <p>đơn hàng trên 200k</p>
          </div>
          <div className="slider__info__wrapper__item">
            <p>60 ngày đổi trả</p>
            <p>bất cứ lí do gì</p>
          </div>
          <div className="slider__info__wrapper__item">
            <p>Đến tận nơi nhận hàng trả</p>
            <p>hoàn tiền trong 24h</p>
          </div>
        </div>
      </div>
    </div> 
  )
}

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    timeOut: PropTypes.number
}


export default Slider