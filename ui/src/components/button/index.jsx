import React from 'react';

import './index.scss';

export const Button = ({children, className, onClick, style, id}, args) => {
  return (
    <button
      className={className}
      id={id}
      onClick={onClick}
      style={style}
      value={children}
      {...args}
    >
      {children}
    </button>
  );
};