import React, {useState} from 'react';
import useDrivePicker from 'react-google-drive-picker';

import {useCreateForms} from '../../hooks/useCreateForms';

import './index.scss';

export const Import = () => {
  const [openPicker, authResponse] = useDrivePicker();
  const [formId, setFormId] = useState(null);

  useCreateForms(formId, authResponse?.access_token);

  const handleOpenPicker = async () => {
    openPicker({
      clientId: process.env.REACT_APP_CLIENT_ID,
      developerKey: process.env.REACT_APP_API_KEY,
      viewId: 'FORMS',
      callbackFunction: async (data) => {
        if (data.action === 'picked') {
          setFormId(data.docs[0].id);
        }
      },
    });
  };

  return (
    <div className="wrapper import">
      <ol className="import-steps">
        <li className="import-step active">Import</li>
        <li className="import-step">Create</li>
        <li className="import-step">Share</li>
      </ol>
      <button
        className="import-button"
        onClick={handleOpenPicker}
      >
        <img src="/images/document.svg"/>
        Import from Google Forms
      </button>
    </div>
  );
};