import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@iconify/react';

const Button = props => {
    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : ''
    const size = props.size ? 'btn-' + props.size :''
    const animate = props.animate ? 'btn-animate' : ''
    const classTen = props.classTen ? props.classTen : ''
  return (
    <button
        className={`btn ${bg} ${size} ${animate} ${classTen}`}
        onClick={props.onclick ? () => props.onClick() : null}
        
    >
        <span className="btn__txt">{props.children}</span>
        {
            props.icon ? (
                <span className="btn__icon">
                    <Icon icon={`${props.icon}`}></Icon>
                </span>
            ): null
        }
    </button>
  )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func,
    classTen: PropTypes.string,

}

export default Button