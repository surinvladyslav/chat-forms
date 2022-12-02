import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import {useContext} from '../../store/context';

import './index.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link className="header-logo" to="/">
            <img src="/images/logo.svg" alt="logo"/>
          </Link>
        </div>
      </div>
    </header>
  );
};

export const ChatHeader = () => {
  const {typing} = useContext();
  return (
    <div className="chat-header">
      <div className="content">
        <div className="top">
          <span className="peer-title">chat+</span>
        </div>
        <div className="bottom">
          <div className="info">
            <span className={cx('online', {'typing': typing})}>
              <span className="i18n online-text">online</span>
              <span className="peer-typing peer-typing-text">
                <span className="peer-typing-text-dot"/>
                <span className="peer-typing-text-dot"/>
                <span className="peer-typing-text-dot"/>
              </span>
              <span className="i18n peer-typing-description">typing</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
