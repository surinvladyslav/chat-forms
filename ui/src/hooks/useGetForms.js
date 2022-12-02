import * as React from 'react';
import {useEffect} from 'react';

import {actions} from '../store/reducers';
import {useContext} from '../store/context';

export const useGetForms = (id) => {
  const {dispatch} = useContext();

  useEffect(() => {
    // dispatch({type: actions.LOADER, payload: true});

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/forms/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        dispatch({type: actions.FORM_DATA, payload: json});
        // dispatch({type: actions.LOADER, payload: false});
      }
      catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);
};