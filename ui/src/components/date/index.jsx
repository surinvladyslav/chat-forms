import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import {useContext} from '../../store/context';

import './index.scss';

export const Date = ({createdAt}) => {
  const {messages} = useContext();
  return (
    <div className={cx('bubble is-date', {
      'is-sticky': messages && messages.length === 0,
    })}>
      <div className="service-msg">
        <span className="i18n">{moment(createdAt).format('LL')}</span>
      </div>
    </div>
  );
};
