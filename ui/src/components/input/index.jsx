import React, {useState} from 'react';

import {questionTypes} from '../tools';

import './index.scss';

export const Input = ({
  onClick,
  choiceQuestionsType,
  onClickQuestionCheckbox,
}) => {
  const [value, setValue] = useState(null);
  console.log(value);
  return (
    <div className="input-message-wrapper">
      <input
        className="input-message-input"
        type={'text'}
        autoFocus
        onInput={event => setValue(event.target.value)}
        onChange={event => choiceQuestionsType === questionTypes.checkbox &&
          onClickQuestionCheckbox(event.target.value)}
        placeholder="Message"
        style={{transitionDuration: '181ms'}}
        onKeyPress={event => choiceQuestionsType !== questionTypes.checkbox &&
          event.key === 'Enter' && onClick(event.target.value)}
      />

      {
        choiceQuestionsType !== questionTypes.checkbox &&
        <button
          onClick={() => onClick(value)}
        >
          <svg style={{width: '1rem', height: 'auto'}}
               xmlns="http://www.w3.org/2000/svg" version="1.0"
               width="260.000000pt" height="280.000000pt"
               viewBox="0 0 260.000000 280.000000"
               preserveAspectRatio="xMidYMid meet">
            <g
              transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path
                d="M1270 1950 c-382 -137 -714 -257 -738 -266 -47 -17 -66 -54 -41 -79 8 -8 157 -69 332 -136 l317 -121 62 57 c34 31 222 208 418 394 372 352 442 415 349 316 -31 -33 -217 -230 -413 -438 -196 -208 -356 -382 -356 -387 0 -5 54 -150 120 -322 106 -278 135 -338 161 -338 30 0 65 88 310 774 250 703 262 740 248 765 -10 18 -24 27 -44 28 -18 1 -305 -96 -725 -247z"/>
            </g>
          </svg>
        </button>
      }
    </div>
  );
}