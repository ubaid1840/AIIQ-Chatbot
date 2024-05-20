import React, { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import { Nav, Col, Row, Tab } from 'react-bootstrap';
import LoadingIndicator from './loadingIndicator';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      fetch(`${appLocalizer.apiUrl}/sessions`)
        .then(response => response.json())
        .then(data => {
          setSessions(data)
        })

    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

  }, []);


  return (
   
      <Tab.Container>
        <Row style={{display:'flex', marginLeft:'-20px', marginTop:'-10px'}}>
          <Col sm={3} style={{ padding: '10px', backgroundColor: '#F8F8F8' }}>
            <Nav variant="pills" className="flex-column">
              {sessions.length != 0 ?
                sessions.map((session_id, index) => (
                  <Nav.Item key={index} style={{ width: '100%', wordWrap: 'break-word', marginBottom: '5px', border: '1px solid', borderRadius: '5px', borderColor: '#cccccc' }} >
                    <Nav.Link className='custom-nav-link' onClick={() => {
                      setSelectedSession(session_id)
                    }} style={{ fontSize: '13px', fontWeight:'500', }} eventKey={session_id}>{session_id}</Nav.Link>
                  </Nav.Item>
                )
                )

                : null}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {selectedSession && <Tab.Pane eventKey={selectedSession}><ChatHistory session_id={selectedSession} /></Tab.Pane>}
            </Tab.Content>
          </Col>
        </Row>
        

        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: -20,
            height: '100vh',
            width: '102%',
            display: 'flex',
            alignItems: 'center',

            backgroundColor: '#71717125',
          }}>
            <div style={{ width: '70vw', justifyContent: 'center', display: 'flex' }}>
              <LoadingIndicator />
            </div>
          </div>
        )}

      </Tab.Container>
  

    // <div class="d-flex align-items-start">
    //   <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    //     <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
    //     <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
    //     <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
    //     <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
    //   </div>
    //   <div class="tab-content" id="v-pills-tabContent">
    //     <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
    //     <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
    //     <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
    //     <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
    //   </div>
    // </div>

    // <Tab.Container id="left-tabs-example">
    //   <Row>
    //     <Col sm={3}>
    //       <Nav variant="pills" className="flex-column">
    //         {sessions.length != 0 ?
    //           sessions.map((session_id) => {
    //             return (
    //               <Nav.Item>
    //                 <Nav.Link onClick={() => setSelectedSession(session_id)} eventKey={session_id}>
    //                   <div style={{width:'50px'}}>
    //                     <div style={{width:'auto', overflow:'visible'}}>
    //                     {session_id}
    //                     </div>
    //                   </div></Nav.Link>
    //               </Nav.Item>
    //             )
    //           }) : null}

    //       </Nav>
    //     </Col>
    //     <Col sm={9}>
    //       <Tab.Content>
    //         <Tab.Pane eventKey={selectedSession}><ChatHistory session_id={selectedSession} /></Tab.Pane>
    //       </Tab.Content>
    //     </Col>
    //   </Row>
    // </Tab.Container>

    // <Accordion>
    //   {sessions.length != 0 ?
    //     sessions.map((session_id) => (
    //       <div>
    //         <div style={{marginBottom:'10px'}}>
    //           <CustomToggle eventKey={session_id}>{session_id}</CustomToggle>
    //         </div>
    //         <Accordion.Collapse eventKey={session_id}>
    //           <div style={{}}>
    //             {session_id == selectedSession ? <ChatHistory session_id={selectedSession} /> : null}
    //           </div>
    //         </Accordion.Collapse>
    //       </div>
    //     ))
    //     : null}

    // </Accordion>

    // <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    //   <Row>
    //     <Col sm={3}>
    //       <Nav variant="pills" className="flex-column">
    //         {sessions.length != 0
    //           ?
    //           sessions.map((session_id) => (
    //             <Nav.Item>
    //               <div style={{width:'200px'}}>
    //               <Nav.Link onClick={()=>handleSessionSelect(session_id)} eventKey={session_id}>{session_id}</Nav.Link>
    //               </div>
    //             </Nav.Item>
    //           ))
    //           : null}
    //       </Nav>
    //     </Col>
    //     <Col sm={9}>
    //       <Tab.Content>
    //         <Tab.Pane eventKey={selectedSession}><ChatHistory session_id={selectedSession} /></Tab.Pane>
    //       </Tab.Content>
    //     </Col>
    //   </Row>
    // </Tab.Container>

    // <div className="container">
    //   <div className="row mt-4">
    //     <div className="col-md-4">
    //       <SessionsList sessions={sessions} onSelect={handleSessionSelect} />
    //     </div>
    //     <div className="col-md-8">
    //       {selectedSession && <ChatHistory session_id={selectedSession} />}
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
