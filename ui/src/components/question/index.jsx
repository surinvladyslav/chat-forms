import React from 'react';
import cx from 'classnames';

import {useContext} from '../../store/context';
import {Button} from '../button';

import {questionTypes} from '../tools';

import './index.scss';

export const Question = ({
  onClickQuestionRadio,
  onClickQuestionCheckbox,
  choiceQuestionsType,
}) => {
  const {questions} = useContext();

  return (
    <div className="chat-questions">
      <div className="chat-questions-inner">
        {
          questions?.map((question, i) => (
            !question?.isOther &&
            <Button
              className={cx('btn', {
                'active': question.checked,
              })}
              key={i}
              onClick={(event) => {
                choiceQuestionsType === questionTypes.checkbox
                  ? onClickQuestionCheckbox(questions?.find(
                    question => question.questionId ===
                      event.currentTarget.id).questionId)
                  : onClickQuestionRadio(
                    event.currentTarget.value.substring(1));
              }}
              id={question.questionId}
            >
              {
                choiceQuestionsType === questionTypes.checkbox ?
                  question.checked ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.143"
                         height="14.142" viewBox="0 0 14.143 14.142">
                      <g id="v"
                         transform="translate(-113.845 89.097) rotate(-45)">
                        <path id="Union_27" data-name="Union 27"
                              d="M-11036.048-19825.881h-2v-7h2v5h11v2Z"
                              transform="translate(11175.05 19856.879)"/>
                      </g>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.003"
                         height="12.002" viewBox="0 0 12.003 12.002">
                      <g id="plus" transform="translate(-131.998 -19)">
                        <path id="Union_28" data-name="Union 28"
                              d="M-11022-19824v-5h-5v-2h5v-5h2v5h5v2h-5v5Z"
                              transform="translate(11159 19855)"/>
                      </g>
                    </svg>
                  : null
              }
              {question.value}
            </Button>
          ))
        }
      </div>
    </div>
  );
};