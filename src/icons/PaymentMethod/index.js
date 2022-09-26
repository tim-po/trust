import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.00004 2H14C14.1769 2 14.3464 2.07024 14.4714 2.19526C14.5965 2.32029 14.6667 2.48986 14.6667 2.66667V13.3333C14.6667 13.5101 14.5965 13.6797 14.4714 13.8047C14.3464 13.9298 14.1769 14 14 14H2.00004C1.82323 14 1.65366 13.9298 1.52864 13.8047C1.40361 13.6797 1.33337 13.5101 1.33337 13.3333V2.66667C1.33337 2.48986 1.40361 2.32029 1.52864 2.19526C1.65366 2.07024 1.82323 2 2.00004 2V2ZM13.3334 8H2.66671V12.6667H13.3334V8ZM13.3334 5.33333V3.33333H2.66671V5.33333H13.3334Z"
        fill="black"/>
    </svg>
  );
};
