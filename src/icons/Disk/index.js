import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.83333 15.8333V10.8333H14.1667V15.8333H15.8333V6.52333L13.4767 4.16667H4.16667V15.8333H5.83333ZM3.33333 2.5H14.1667L17.5 5.83333V16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V3.33333C2.5 3.11232 2.5878 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5V2.5ZM7.5 12.5V15.8333H12.5V12.5H7.5Z"
        fill="white"/>
    </svg>
  );
};
