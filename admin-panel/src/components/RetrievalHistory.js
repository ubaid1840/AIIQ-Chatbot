import React, { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionContext, Card, useAccordionButton } from 'react-bootstrap';
import UPARROW from '../assets/up_arrow_icon.png'
import DOWNARROW from '../assets/down_arrow_icon.png'
import USERICON from '../assets/user_icon.png'
import AIICON from '../assets/chatbot_icon.png'


function RetrievalHistory({ session_id }) {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetch(`${appLocalizer.apiUrl}/sessions/${session_id}`)
      .then(response => response.json())
      .then(data => {
        setChatHistory(data)
      })
      .catch(error => console.error('Error fetching chat history:', error));
  }, [session_id]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <button class="btn btn-outline-link" style={{ border: '0px' }} onClick={decoratedOnClick}>
        {!isCurrentEventKey ? <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DOWNARROW}></img>
          : <img style={{ height: '20px', width: '20px', resize: 'block', }} src={UPARROW}></img>}
      </button>
    );
  }

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
          <ul className="list-group chat-history">
            {chatHistory.map((message, index) => {
              if (message.role === 'human') {
                return (
                  <RenderChat
                    role={'human'}
                    msg={message.content} />
                );
              }

              else if (message.role === 'ai') {
                return (
                  <RenderChat
                    role={'ai'}
                    msg={message.content} />
                );
              }
              else {
                return null; // Don't show messages with other roles
              }
            })}

            {chatHistory.map((message, index) => {
              if (message.role === 'data_used') {
                return (
                  message?.content?.length > 0 && (
                    <Accordion style={{ marginBottom: '10px' }}>
                      <Card style={{ padding: '0px', margin: '0px', maxWidth: '100%', marginBottom: '5px' }}>
                        <Card.Header className='bg-primary' style={{ color: 'white' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              Documents Used
                            </div>
                            <ContextAwareToggle eventKey="-1"></ContextAwareToggle>
                          </div>

                        </Card.Header>
                        <Accordion.Collapse eventKey="-1">
                          <Card.Body>
                            <Accordion style={{ marginBottom: '10px' }}>
                              {message.content.map((item, index) => (
                                <Card style={{ padding: '0px', margin: '0px', maxWidth: '100%', marginBottom: '5px' }}>
                                  <Card.Header className='bg-primary' style={{ color: 'white' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <div>
                                        {`Page ${item.page} ${item.source}`}
                                      </div>
                                      <ContextAwareToggle eventKey={index}></ContextAwareToggle>
                                    </div>

                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index}>
                                    <Card.Body>

                                      <div style={{ textAlign: 'justify' }}>
                                        <div>{`Page: ${item.page_content}`}</div>
                                      </div>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              ))}
                            </Accordion>

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>

                    </Accordion>
                  )
                )
              }
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RetrievalHistory;
