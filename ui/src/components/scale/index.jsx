import React from 'react';

import {Button} from '../button';

import './index.scss';

export const Scale = ({scaleQuestion, onClick}) => {
  return (
    <div className="chat-questions">
      <div className="chat-questions-inner">
        {Array.from(Array(scaleQuestion?.high), (e, i) => {
          return <Button
            className="btn"
            key={i}
            onClick={(event) => onClick(event.currentTarget.value)}
          >{i + 1}</Button>;
        })}
      </div>
    </div>
  );
};