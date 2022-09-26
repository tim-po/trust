import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="30" height="30" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 6.09625 6.09625 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 19.9037 19.9037 25.5 13 25.5ZM13 23C15.6522 23 18.1957 21.9464 20.0711 20.0711C21.9464 18.1957 23 15.6522 23 13C23 10.3478 21.9464 7.8043 20.0711 5.92893C18.1957 4.05357 15.6522 3 13 3C10.3478 3 7.8043 4.05357 5.92893 5.92893C4.05357 7.8043 3 10.3478 3 13C3 15.6522 4.05357 18.1957 5.92893 20.0711C7.8043 21.9464 10.3478 23 13 23V23ZM11.75 6.75H14.25V9.25H11.75V6.75ZM11.75 11.75H14.25V19.25H11.75V11.75Z"
        fill="#33CC66"/>
    </svg>
  );
};
