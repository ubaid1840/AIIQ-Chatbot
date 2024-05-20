import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import USERICON from '../assets/user_icon.png'
import AIICON from '../assets/chatbot_icon.png'

function ChatHistory({ session_id, }) {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {

    if (session_id) {
      try {
        fetch(`${appLocalizer.apiUrl}/sessions/${session_id}`)
          .then(response => response.json())
          .then(data => {
            setChatHistory(data)
          })
      } catch (error) {
        console.log(error)
        const tempData = []
        tempData.push({
          role: 'ai',
          content: 'Error loading data'
        })
        setChatHistory(tempData)
      }
    }

  }, [session_id]);

  const RenderChat = ({ role, msg }) => {
    const [showMore, setShowMore] = useState(false)
    if (role == 'human')
      return (
        <div style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', justifyContent: 'flex-end', paddingLeft: '16vw', marginBottom: '10px' }}>
          <div style={{ padding: '5px', backgroundColor: '#0E4FCF', color: 'white', fontSize: '14px', borderRadius: '5px' }}>
            {showMore ? msg : msg.substring(0, 400)}
            {msg.length > 399 ? <button className="btn btn-light" style={{ margin: '10px' }} onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button> : null}
          </div>
          <img style={{ height: '25px', width: '25px', marginLeft: '10px' }} src={USERICON}></img>
        </div>
      )
    if (role == 'ai')
      return (
        <div style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', paddingRight: '16vw', display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <img style={{ height: '25px', width: '25px', marginRight: '10px', }} src={AIICON}></img>
          <div style={{ padding: '5px', backgroundColor: '#EAEAEA', color: 'black', fontSize: '14px', borderRadius: '5px' }}>
            {showMore ? msg : msg.substring(0, 400)}
            {msg.length > 399 ? <button className="btn btn-primary" style={{ margin: '10px' }} onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button> : null}
          </div>
        </div>
      )
  }

  return (
    <React.Fragment>

      <div style={{ marginBottom: '10px', border: '0.5px solid', borderColor: '#cccc', borderRadius: '5px', marginTop: '10px' }}>
        <div className='bg-info' style={{ color: 'white', padding: '10px' }}>
          <h3 style={{ fontSize: '18px' }}>Chat History</h3>
        </div>
        <div className="chat-history-container">
          <ul style={{ paddingLeft: '0px' }}>
            {chatHistory.map((message, index) => {
              if (message.role === 'human') {
                return (
                  <RenderChat
                    role={'human'}
                    msg={message.content} />
                );
              } else if (message.role === 'ai') {
                return (
                  <RenderChat
                    role={'ai'}
                    msg={message.content} />
                );
              } else {
                return null; // Don't show messages with other roles
              }
            })}
          </ul>
        </div>
      </div>


    </React.Fragment>

  );
}

export default ChatHistory;
