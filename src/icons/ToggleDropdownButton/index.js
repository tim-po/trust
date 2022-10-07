import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="10" height="6" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.58581 6.65685L0.636062 1.70711C0.245538 1.31658 0.245538 0.683418 0.636062 0.292893V0.292893C1.02659 -0.097631 1.65975 -0.097631 2.05028 0.292893L6.8586 5.10122C6.93671 5.17932 7.06334 5.17932 7.14144 5.10122L11.9498 0.292893C12.3403 -0.097631 12.9735 -0.097631 13.364 0.292893V0.292893C13.7545 0.683418 13.7545 1.31658 13.364 1.70711L7.70713 7.36396C7.31661 7.75449 6.68344 7.75449 6.29292 7.36396L5.58581 6.65685Z"
        fill="#181833"/>
    </svg>
  );
};
