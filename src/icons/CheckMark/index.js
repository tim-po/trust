import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default (props) => {
  const {
    color = '#fff',
    width = 20,
    height = 20
  } = props
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5.11091" y="14.5103" width="14" height="3" transform="rotate(-45 5.11091 14.5103)" fill={color}/>
      <rect x="0.868271" y="10.2676" width="3" height="9" transform="rotate(-45 0.868271 10.2676)" fill={color}/>
    </svg>
  );
};
