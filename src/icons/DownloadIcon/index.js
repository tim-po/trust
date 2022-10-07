import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.83341 6.33333H14.0001L9.00008 11.3333L4.00008 6.33333H8.16675V0.5H9.83341V6.33333ZM2.33341 13.8333H15.6667V8H17.3334V14.6667C17.3334 14.8877 17.2456 15.0996 17.0893 15.2559C16.9331 15.4122 16.7211 15.5 16.5001 15.5H1.50008C1.27907 15.5 1.06711 15.4122 0.910826 15.2559C0.754545 15.0996 0.666748 14.8877 0.666748 14.6667V8H2.33341V13.8333Z"
        fill="#33CC66"/>
    </svg>
  );
};
