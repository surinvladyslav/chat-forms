import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';

import './index.scss';

export const Share = () => {
  const {id} = useParams();
  const [copy, setCopied] = useState(false);

  useCopyToClipboard(`${process.env.REACT_APP_URL}/forms/${id}`, copy,
    setCopied);

  return (
    <div className="wrapper share">
      <h5 className="share-title base">Your chat is ready!</h5>
      <p className="share-subtitle">What would you like to do next?</p>
      <div className="share-links">
        <Link
          className="share-link"
          to={`/forms/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/exit.svg" alt="exit icon"/>
          Open your chatbot
        </Link>
        <Link
          className="share-link"
          to="/"
        >
          <img src="/images/plus.svg" alt="plus icon"/>
          Create another
        </Link>
      </div>
      <h5 className="share-title friends">Share it with your friends!</h5>
      <div className="share-links friends">
        <a
          className="share-link"
          href={`mailto:info@programming.org.ua?subject=${process.env.REACT_APP_URL}/forms/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/email.svg" alt="email icon"/>
          Share by Email
        </a>
        <button
          className="share-link"
          onClick={() => {setCopied(true);}}
        >
          <img src="/images/copy.svg" alt="copy icon"/>
          Get your chatbot link
        </button>
      </div>
      <div className="share-buttons">
        <a
          className="share-button"
          href={`https://www.facebook.com/sharer.php?u=${process.env.REACT_APP_URL}/forms/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/facebook.svg" alt="facebook icon"/>
        </a>
        <a
          className="share-button"
          href={`https://twitter.com/intent/tweet?url=${process.env.REACT_APP_URL}/forms/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/twitter.svg" alt="twitter icon"/>
        </a>
        <a
          className="share-button"
          href={`https://t.me/share/url?url=${process.env.REACT_APP_URL}/forms/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/telegram.svg" alt="telegram icon"/>
        </a>
      </div>
    </div>
  );
};