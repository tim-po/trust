import React from 'react';
import './index.scss'
// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width='25' height='25' viewBox='0 0 20 20'>
      <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g className='bell' fill={'#181833'}>
          <path
            d='M10,20 C10.14,20 10.27,19.99 10.4,19.96 C11.05,19.82 11.58,19.38 11.84,18.78 C11.94,18.54 11.99,18.28 11.99,18 L7.99,18 C8,19.1 8.89,20 10,20 Z'
          >
          </path>
          <path
            d='M16,9 C16,5.93 14.36,3.36 11.5,2.68 L11.5,2 C11.5,1.17 10.83,0.5 10,0.5 C9.17,0.5 8.5,1.17 8.5,2 L8.5,2.68 C5.63,3.36 4,5.92 4,9 L4,14 L2,16 L2,17 L18,17 L18,16 L16,14 L16,9 Z'
            id='Path' fillRule='nonzero'/>
        </g>
      </g>
    </svg>
  )
};
