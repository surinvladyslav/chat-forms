import {actions} from './index';
import {random} from '../../hooks/useRandom';

export const messagesReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.ADD_MESSAGE:
      return {...state, messages: [...state.messages, payload]};
    case actions.ADD_QUESTIONS:
      return {
        ...state,
        questions: payload.map((option) => ({
          ...option,
          questionId: random(),
          checked: false,
        })),
      };
    case actions.CHANGE_QUESTIONS:
      state.questions.find(
        question => question.questionId === payload
          ? question.checked = !question.checked
          : null,
      );
      return {...state, questions: [...state.questions]};
    // case actions.CLEAR_QUESTIONS:
    //     return {...state, questions: []}
    // case actions.DELETE_MESSAGE:
    //     return {...state, messages: state.messages.filter(c => c.itemId !==
    // payload)} case actions.CHANGE_MESSAGE: state.messages.find(message => {
    // if (message.itemId === payload.id) { message.title = payload.title;
    // message.edited = payload.edited; } }) return {...state, messages:
    // [...state.messages]} case actions.MESSAGE_DROPDOWN:
    //     return {...state, messageDropdown: payload}
    // case actions.EDIT_MESSAGE:
    //     return {...state, editMessage: payload}
    default:
      return state;
  }
};