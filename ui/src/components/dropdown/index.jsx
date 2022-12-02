import React from 'react';

import cx from 'classnames';
import {useContext} from '../../store/context';

import './index.scss';

export const ChatDropdown = ({children, className, style, onMouseLeave}) => {
  const {chatDropdown, messageDropdown} = useContext();
  return (
    <div
      className={cx(className,
        {'open': chatDropdown, 'active': messageDropdown})}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {children}
    </div>
  );
};