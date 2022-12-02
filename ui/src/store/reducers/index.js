export const actions = {
  LOADER: 'LOADER',
  TYPING: 'TYPING',
  CHAT_INDEX: 'CHAT_INDEX',
  ALERT: 'ALERT',
  FORM_DATA: 'FORM_DATA',

  CHANGE_QUESTIONS: 'CHANGE_QUESTIONS',
  CLEAR_QUESTIONS: 'CLEAR_QUESTIONS',
  ADD_QUESTIONS: 'ADD_QUESTIONS',

  ADD_MESSAGE: 'ADD_MESSAGE',
  CHANGE_MESSAGE: 'CHANGE_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  EDIT_MESSAGE: 'EDIT_MESSAGE',
}

export const alertTypes = {
  success: 'success',
  error: 'error',
};

export const rootReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.LOADER:
      return {...state, loader: payload};
    case actions.CHAT_INDEX:
      return {...state, chatIndex: state.chatIndex + 1};
    case actions.ALERT:
      return {
        ...state,
        alert: {
          active: payload.active,
          message: payload.message,
          ...payload,
        },
      };
    case actions.TYPING:
      return {...state, typing: payload};
    default:
      return state;
  }
};