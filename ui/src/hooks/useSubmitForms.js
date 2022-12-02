import * as React from 'react';
import { useEffect } from "react";

import { actions, alertTypes } from "../store/reducers";
import { useContext } from "../store/context";

export const useSubmitForms = (id, submit) => {
    const { dispatch, messages } = useContext();
    const ownMessages = [];

    messages.forEach(message => message.is === false && ownMessages.push(message));
    ownMessages.shift();
    ownMessages.pop();

    useEffect(() => {
        if (submit) {
            // dispatch({type: actions.LOADER, payload: true});

            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/forms/${id}`,{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messages: ownMessages
                        })
                    });
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }

                    const json = await response.json();
                    // dispatch({type: actions.LOADER, payload: false});
                    dispatch({
                        type: actions.ALERT,
                        payload: {
                            active: true,
                            message: alertTypes.success,
                            type: alertTypes.success,
                        }
                    });
                } catch (error) {
                    dispatch({
                        type: actions.ALERT,
                        payload: {
                            active: true,
                            type: alertTypes.error,
                            message: error.message
                        }
                    });
                    console.log("error", error);
                }
            };

            fetchData();
        }
    }, [submit]);
};