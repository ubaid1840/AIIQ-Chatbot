import React, { useState } from 'react';
import Session from './Session';
import UploadForm from './UploadForm';
import Config from './ChatBotConfig';
import DocumentHistory from './documents';

function SessionRouter() {
  const queryParams = new URLSearchParams(window.location.search);
  const value = queryParams.get('page')

  const MainPage = () => (
    <div>
      <UploadForm />
    </div>
  );

  const ConfigPage = () => (
    <div className="main-content">
      <Config />
    </div>

  );

  const SessionPage = () => (
    <div className="main-content">
      <Session />
    </div>
  );

  const RetrievalHistoryPage = () => (
    <div className="main-content">
      <DocumentHistory />
    </div>
  );

  return (
    <React.Fragment>
      {
        value == 'wpap-view-files'
          ?
          <MainPage />
          : value == 'wpap-view-sessions'
            ?
            <SessionPage />
            : value == 'wpap-configure-parameters'
              ?
              <ConfigPage />
              : value == 'wpap-view-retrieval-history'
                ? <RetrievalHistoryPage />
                : null
      }

    </React.Fragment >
  );
}

export default SessionRouter;
