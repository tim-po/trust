import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3 17.025L16.05 11.275L15.05 10.275L10.325 15L7.825 12.5L6.8 13.525L10.3 17.025ZM6.275 20C4.80833 20 3.5625 19.4875 2.5375 18.4625C1.5125 17.4375 1 16.1917 1 14.725C1 13.425 1.41667 12.2834 2.25 11.3C3.08333 10.3167 4.14167 9.72502 5.425 9.52502C5.75833 7.90836 6.54167 6.58752 7.775 5.56252C9.00833 4.53752 10.4333 4.02502 12.05 4.02502C13.9167 4.02502 15.4917 4.70419 16.775 6.06252C18.0583 7.42086 18.7 9.05002 18.7 10.95V11.55C19.9 11.5167 20.9167 11.9042 21.75 12.7125C22.5833 13.5209 23 14.5417 23 15.775C23 16.925 22.5833 17.9167 21.75 18.75C20.9167 19.5834 19.925 20 18.775 20H6.275Z"
        fill="#8D929C"/>
    </svg>
  );
};
