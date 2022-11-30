import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react';
import Grid from './Grid'

const ProductReview = ({product}) => {

  return (
    <div className="product-review">
        <div className="product-review__head">
            <div className="product-review__head__title">
                <span>{product.reviews.length} <p>Đánh giá</p></span>
                <span>{product.rate}/5 <Icon icon="ic:round-star-rate" className="icon-star" /></span>
            </div>
        </div>
        <div className="product-review__content">
            <Grid
                col={2}
                mdCol={2}
                smCol={1}
                gap={40}
            >
                {
                    product.reviews.map(review => (
                        <div className="product-review__content__item" key={review._id}>
                            <div className="product-review__content__item__wrapper">
                                <div className="product-review__content__item__wrapper__rate">
                                    <div className="product-review__content__item__wrapper__rate__star">
                                        
                                        {
                                            [...Array(review.star)].map(star => (
                                                <Icon icon="ic:round-star-rate" className="icon-rate active-rate" />
                                            ))
                                        }
                                        {
                                            [...Array(5-review.star)].map(star => (
                                                <Icon icon="ic:round-star-rate" className="icon-rate" />
                                            ))
                                        }
                              
                                    </div>
                                </div>
                                <div className="product-review__content__item__wrapper__content">
                                    <div className="product-review__content__item__wrapper__content__author">
                                        user: {review.user}
                                    </div>
                                    <div className="product-review__content__item__wrapper__content__product">
                                        <span>{review.infoProductOrdered.color}/{review.infoProductOrdered.size}</span>
                                    </div>
                                    <div className="product-review__content__item__wrapper__content__des">
                                        <p>{review.content}</p>
                                        <span className="product-review__content__item__wrapper__content__des__date">
                                            {review.createdAt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }   
            </Grid>
        </div>
    </div>
  )
}

ProductReview.propTypes = {
    product: PropTypes.object.isRequired

}

export default ProductReview