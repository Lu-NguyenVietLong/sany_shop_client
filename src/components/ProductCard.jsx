import React, {useState,memo} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Button from "./Button"
import numberWithCommas from '../utils/numberWithCommas'
const colors= ["white", "red", "orange"];


const ProductCard = ({data}) => {

    const [activeColor, setActiveColor] = useState('')

    const clickColor = (color) => setActiveColor(color)

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Link to={`/category/${data._id}`}>
                    <img src={data.images[0]?.img} alt="" /> 
                    <img src={data.images[1]?.img} alt="" />
                    <div className="product-card__image__size">
                        {
                            data.detail.map((size) => (
                                <div key={size._id} className="product-card__image__size__item">
                                    <span>{size.size}</span>
                                </div>
                            ))
                        }
                    </div>
                </Link>
            </div>
            <div className="product-card__color">
                {data.detail[0].detailColor.map((item, index) => (
                    <div key={item._id} className={`product-card__color__item ${activeColor === item.color ? 'active' : ''}`} onClick={() => clickColor(item.color)}>
                        <span style={{backgroundColor: item.color}}  className={`${item.color}`}></span>
                    </div>
                ))}     
            </div>
            <Link to={`/category/${data._id}`}>
            <p className="product-card__name">{data.name}</p>
            </Link>
            <div className="product-card__price">
                <span className='product-card__price--new'>{numberWithCommas(data.price - data.price * (data.discount /100))}</span>
                <span className="product-card__price--old">
                    <del>{numberWithCommas(data.price)}</del>
                </span>
                <span className="product-card__price--discount">{data.discount}%</span>
            </div>
            <Link to={`/category/${data._id}`}>
                <div className="product-card__btn">
                    <Button
                        size='sm'
                        animate={true}
                        icon='eva:shopping-cart-outline'
                    >
                        Mua 2 được giảm thêm 10%
                    </Button>
                </div>
            </Link>
        </div>
    )
}

ProductCard.propsTypes = {
    // data:
}

export default memo(ProductCard)