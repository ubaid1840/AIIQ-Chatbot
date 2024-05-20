import React, { useState, useEffect } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import CHATBOTICON from '../assets/chatbot_icon.png'
import CROSSICON from '../assets/cross_icon.png'
import '../style.css'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


const BotRedirect = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');


  useEffect(() => {

      const fetchData = async () => {
      const userInput = steps['2'].value
      try {
        const requestOptions = {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ userInput })
        };

        await fetch('https://aiiq.publicvm.com/query', requestOptions)
          .then(response => response.json())
          .then(data => {
            setResult(data.response)
          })
      } catch (error) {
        setResult('Got into Error...')
      } finally {
        setLoading(false)
        triggerNextStep()
      }

    }

    fetchData()

  }, [])


  return (
    <div >
      {loading ? <Loading /> : result}
    </div>
  );

}


const ChatbotIcon = () => {
  const renderTooltip = (props) => (
    <Tooltip  {...props}>
      <div style={{backgroundColor:'black', padding:'5px', fontSize:'12px', margin:'10px'}}> Need help? Try AIIQ Chat Support</div>
    </Tooltip>
  );
  
  return (
    <OverlayTrigger
    delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      placement="top"
    >
      <img style={{ height: '40px', width: '40px' }} src={CHATBOTICON} alt='Chatbot Icon' />
    </OverlayTrigger>

  )
}





function ChatAPP() {
  const [opened, setOpened] = useState(false);

  const toggleFloating = ({ opened }) => {
    setOpened(opened);
  };

  const HeaderComponent = () => {
    return (
      <div style={{ backgroundColor: '#424242', padding: '15px', color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          AIIQ Chat Support
        </div>
        <button onClick={() => toggleFloating({ opened: false })} className='chatbot-cross' style={{ backgroundColor: 'transparent', borderWidth: 0 }}>
          <img style={{ width: '10px', height: '10px' }} src={CROSSICON} />
        </button>
      </div>
    )
  }


  return (


    <ChatBot
      userDelay={500}
      bubbleStyle={{ backgroundColor: 'white', color: 'black' }}
      bubbleOptionStyle={{ backgroundColor: 'white', color: 'black' }}
      headerComponent={<HeaderComponent />}
      floatingStyle={{ backgroundColor: 'white' }}
      floating={true}
      botAvatar={CHATBOTICON}
      floatingIcon={<ChatbotIcon />}
      opened={opened}
      toggleFloating={toggleFloating}
      steps={[
        {
          id: '1',
          message: 'Hi! What is your query?',
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          component: <BotRedirect />,
          waitAction: true,
          asMessage: true,
          trigger: '2',
        },
      ]}
    />

  );
}

export default ChatAPP;
