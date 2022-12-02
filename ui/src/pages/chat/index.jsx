import React from 'react';
import {useParams} from 'react-router-dom';

import {Messages} from '../../components/messages';
import {Tools} from '../../components/tools';
import {ChatHeader} from '../../components/header';

import {useGetForms} from '../../hooks/useGetForms';
import {useContext} from '../../store/context';

import './index.scss';

export const Chat = () => {
  const {formData} = useContext();
  const {id} = useParams();

  useGetForms(id);

  return (
    <div className="wrapper chat">
      <div className="tabs-container">
        <div className="tabs-tab main-column">
          <div className="chats-container tabs-container">
            <div className="chat tabs-tab active">
              {
                formData &&
                <>
                  <ChatHeader/>
                  <Messages/>
                  <Tools/>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};