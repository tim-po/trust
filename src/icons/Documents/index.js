import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6666 1.6665H4.99992C4.55789 1.6665 4.13397 1.8421 3.82141 2.15466C3.50885 2.46722 3.33325 2.89114 3.33325 3.33317V16.6665C3.33325 17.1085 3.50885 17.5325 3.82141 17.845C4.13397 18.1576 4.55789 18.3332 4.99992 18.3332H14.9999C15.4419 18.3332 15.8659 18.1576 16.1784 17.845C16.491 17.5325 16.6666 17.1085 16.6666 16.6665V6.6665L11.6666 1.6665Z" stroke="#33CC66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 1.6665V6.6665H16.6667" stroke="#33CC66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3334 10.8335H6.66675" stroke="#33CC66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3334 14.1665H6.66675" stroke="#33CC66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
