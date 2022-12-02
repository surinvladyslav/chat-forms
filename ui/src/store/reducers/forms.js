import {actions} from './index';

export const formsReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.FORM_DATA:
      return {...state, formData: payload};
    default:
      return state;
  }
};