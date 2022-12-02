import * as React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {actions, alertTypes} from '../store/reducers';
import {useContext} from '../store/context';

export const useCreateForms = (id, token) => {
  const {dispatch} = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && token) {
      dispatch({type: actions.LOADER, payload: true});

      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/forms`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id,
                token,
              }),
            });
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const path = await response.json();
          dispatch({type: actions.LOADER, payload: false});
          dispatch({
            type: actions.ALERT,
            payload: {
              active: true,
              message: alertTypes.success,
              type: alertTypes.success,
            },
          });
          navigate(`/share/${path}`);
        }
        catch (error) {
          dispatch({
            type: actions.ALERT,
            payload: {
              active: true,
              type: alertTypes.error,
              message: error.message,
            },
          });
        }
      };

      fetchData();
    }
  }, [id, token]);
};