import React from 'react';

function SessionsList({ sessions, onSelect }) {
  return (
    <div>
      <h3>Sessions</h3>
      <ul className="list-group">
        {sessions.map(session_id => (
          <li
            key={session_id}
            className="list-group-item"
            onClick={() => onSelect(session_id)}
          >
            {session_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionsList;
