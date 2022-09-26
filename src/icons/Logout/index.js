import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_5516)">
        <path
          d="M10.6693 6.276L4.93131 12.014L3.98865 11.0713L9.72598 5.33333H4.66931V4H12.0026V11.3333H10.6693V6.276V6.276Z"
          fill="#181833"/>
      </g>
      <defs>
        <clipPath id="clip0_1_5516">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};
