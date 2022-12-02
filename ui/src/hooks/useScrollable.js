import React, {useEffect} from 'react';
import {useContext} from '../store/context';

export const useScrollable = (scrollableRef) => {
  const {messages, chatIndex, typing} = useContext();
  const scrollToBottomWithSmoothScroll = () => {
    scrollableRef.current?.scrollTo({
      top: scrollableRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (scrollableRef) {
      scrollToBottomWithSmoothScroll();
    }
  }, [messages, chatIndex, typing]);
};