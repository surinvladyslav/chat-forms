import React, { useEffect } from 'react';
import cx from "classnames";

import { actions, alertTypes } from "../../store/reducers";
import { useContext } from "../../store/context";

import './index.scss';

export const Alert = () => {
  const { alert, dispatch } = useContext()

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch({
        type: actions.ALERT,
        payload: {
          active: false,
          type: null,
          message: null
        }
      });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  },[alert]);

  return (
    <div className={cx("alert", {"active": alert.active})}>
      { alert.type === alertTypes.success && <img src="/images/success.svg" alt=""/> }
      { alert.type === alertTypes.error && <img src="/images/exclamation.svg" alt=""/> }
      <p>{ alert.message }</p>
    </div>
  );
}