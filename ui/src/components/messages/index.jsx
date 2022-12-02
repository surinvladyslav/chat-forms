import React, {useRef} from 'react';

import {Date} from '../date';
import {Scrollable} from '../scrollable';
import {Message} from '../message';

import {useContext} from '../../store/context';
import {useScrollable} from '../../hooks/useScrollable';

import './index.scss';

export const Messages = () => {
  const {messages, formData} = useContext();
  const scrollableRef = useRef();
  useScrollable(scrollableRef);

  return (
    <div className="bubbles">
      <Scrollable ref={scrollableRef}>
        <div className="bubbles-inner">
          <div className="bubbles-date-group">
            <Date createdAt={formData?.createdAt}/>
            <div className="bubbles-group">
              {
                messages?.map((message, index) => (
                  <Message
                    key={index}
                    {...message}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  );
};