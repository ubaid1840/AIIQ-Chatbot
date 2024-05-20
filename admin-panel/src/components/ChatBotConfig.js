import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import LoadingIndicator from './loadingIndicator'

function Config() {

  const [openai_llm_name, setOpenai_llm_name] = useState('')
  const [groq_llm_name, setgroq_llm_name] = useState('')
  const [temperature, settemperature] = useState(0)
  const [k, setk] = useState(0)
  const [llm_service, setllm_service] = useState('')
  const [chunk_size, setchunk_size] = useState(0)
  const [chunk_overlap, setchunk_overlap] = useState(0)

  const [system_message, setsystem_message] = useState('')
  const [prompt_with_rag, setPrompt_with_rag] = useState('')

  const [loading, setLoading] = useState(true)
  const [firstBox, setFirstBox] = useState('')
  const [secondBox, setSecondBox] = useState('')
  const [thirdBox, setThirdBox] = useState('')
  const [promptParameter, setPromptParameter] = useState(['context', 'query'])
  const [completePrompt, setCompletePrompt] = useState(`${firstBox} $(${promptParameter[0]}) ${secondBox} $(${promptParameter[1]}) ${thirdBox}`)

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    setCompletePrompt(`${firstBox} $(${promptParameter[0]}) ${secondBox} $(${promptParameter[1]}) ${thirdBox}`)
  }, [firstBox, secondBox, thirdBox, promptParameter])

  function extractTextParts(inputString) {
    const pattern = /^(.*?)\s*\$\((context|query)\)\s*(.*?)\$\((context|query)\)\s*(.*)$/;
    const matches = inputString.match(pattern);
  
    if (matches) {
      const firstPart = matches[1].trim(); 
      const middlePart = matches[3].trim();
      const lastPart = matches[5].trim(); 
      const firstPlaceholder = matches[2];
  
      return {
        firstPart,
        middlePart,
        lastPart, 
        firstPlaceholder
      };
    }

    return {
      firstPart: '',
      middlePart: '',
      lastPart: inputString,
      firstPlaceholder : ''
    };
  }

  async function fetchData() {
    try {
      await fetch(`${appLocalizer.apiUrl}/get_llm_params/`)
        .then(response => response.json())
        .then(data => {
          setOpenai_llm_name(data.openai_llm_name)
          setgroq_llm_name(data.groq_llm_name)
          settemperature(Number(data.temperature))
          setk(Number(data.k))
          setllm_service(data.llm_service)
          setchunk_size(Number(data.chunk_size))
          setchunk_overlap(Number(data.chunk_overlap))
          setsystem_message(data.system_message)
          const newString = data.prompt_with_rag.replace(/\n/g, '')
          const { firstPart, middlePart, lastPart, firstPlaceholder } = extractTextParts(newString);
          setFirstBox(firstPart)
          setSecondBox(middlePart)
          setThirdBox(lastPart)
          if(firstPlaceholder == 'context'){
            setPromptParameter([firstPlaceholder, 'query'])
          }
          else {
            setPromptParameter([firstPlaceholder, 'context'])
          }
          
        });
    } catch (error) {
      console.log('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event) => {

    const { name, value } = event.target

    if (name == 'openai_llm_name') {
      setOpenai_llm_name(value)
    }
    if (name == 'groq_llm_name') {
      setgroq_llm_name(value)
    }
    if (name == 'temperature') {
      settemperature(Number(value))
    }
    if (name == 'k') {
      setk(Number(value))
    }
    if (name == 'llm_service') {
      setllm_service(value)
    }
    if (name == 'chunk_size') {
      setchunk_size(Number(value))
    }
    if (name == 'chunk_overlap') {
      setchunk_overlap(Number(value))
    }
    if (name == 'system_message') {
      setsystem_message(value)
    }
    if (name == 'prompt_with_rag') {
      setPrompt_with_rag(value)
    }
  };

  const handleSubmit = (event) => {
    const params = {
      openai_llm_name: openai_llm_name,
      groq_llm_name: groq_llm_name,
      temperature: temperature,
      k: k,
      llm_service: llm_service,
      chunk_size: chunk_size,
      chunk_overlap: chunk_overlap,
      system_message: system_message,
      prompt_with_rag : completePrompt
    }
    event.preventDefault();
    try {
      fetch(`${appLocalizer.apiUrl}/set_llm_params/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  };


  const handleMyChange = (event) => {
    const { name, value } = event.target
    if (name == 'first') {
      setFirstBox(value)
    }
    if (name == 'second') {
      setSecondBox(value)
    }
    if (name == 'third') {
      setThirdBox(value)
    }
    if (name == 'promptParameter') {
      if (value == 'context')
        setPromptParameter([value, 'query'])
      if (value == 'query')
        setPromptParameter([value, 'context'])
    }
  }

  const getInputWidth = (inputValue) => {
    console.log(inputValue)
    // Adjust the base width and multiplier according to your needs
    const baseWidth = 100; // Minimum width
    const characterWidth = 8; // Approximate width per character

    // Calculate the width based on the length of the input value
    const textWidth = inputValue.length * characterWidth;

    // Ensure the input has a minimum width to prevent it from collapsing
    return textWidth < baseWidth ? baseWidth : textWidth;
  };

  return (
    <div style={{ width: '70vw' }}>
       <h3>LLM Parameters</h3>
      <hr class="hr" />
      <form onSubmit={(e) => {
        setLoading(true)
        handleSubmit(e)
      }}>
        <div className="form-group row" >
          <div className="form-group row col-6" style={{ alignItems: 'baseline' }}>
            <label className="col ">OpenAI LLM Name:</label>
            <div className="col-sm-8">
              {/* <input type="text" className="form-control" name="openai_llm_name" value={openai_llm_name} onChange={handleInputChange} /> */}
              <Form.Select value={openai_llm_name} onChange={handleInputChange} name='openai_llm_name'>
                <option value='gpt-4-turbo'>gpt-4-turbo</option>
                <option value='gpt-4'>gpt-4</option>
                <option value='gpt-3.5-turbo-0125'>gpt-3.5-turbo-0125</option>
                <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
                <option value='gpt-3.5-turbo-instruct'>gpt-3.5-turbo-instruct</option>
              </Form.Select>
            </div>
          </div>

          <div className="form-group row col-6" style={{ alignItems: 'baseline' }}>
            <label className="col ">GROQ LLM Name:</label>
            <div className="col-sm-8">
              {/* <input type="text" className="form-control" name="groq_llm_name" value={groq_llm_name} onChange={handleInputChange} /> */}
              <Form.Select value={groq_llm_name} onChange={handleInputChange} name="groq_llm_name">
                <option value='Gemma-7b-It'>Gemma-7b-It</option>
                <option value='Llama3-70b-8192'>Llama3-70b-8192</option>
                <option value='Llama3-8b-8192'>Llama3-8b-8192</option>
                <option value='Mixtral-8x7b-32768'>Mixtral-8x7b-32768</option>
              </Form.Select>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 ">LLM Service To Use:</label>
          <div className="col-sm-8" style={{ display: 'flex', textAlign: 'center', verticalAlign: 'center' }}>
            <div className="form-check mr-5 " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <input type="radio" className="form-check-input mr-3" name="llm_service" value="openai" checked={llm_service === 'openai'} onChange={handleInputChange} />
              <label style={{ marginLeft: '2px' }}>OpenAI</label>
            </div>
            <div className="form-check " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <input type="radio" className="form-check-input" name="llm_service" value="groq" checked={llm_service === 'groq'} onChange={handleInputChange} />
              <label style={{ marginLeft: '2px' }}>GROQ</label>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 ">Prompt Template</label>
          <div className="col-sm-8">
          <div>
            <div className="input-container">
              <div style={{}}>
                <input   className="input-field" style={{width: `${getInputWidth(firstBox)}px`, paddingLeft:'5px'}}  name="first" value={firstBox} onChange={handleMyChange} />
              </div>
              <div style={{minWidth:'25%'}}>
                {/* <input type="text" className="form-control" name="groq_llm_name" value={groq_llm_name} onChange={handleInputChange} /> */}
                <Form.Select style={{height:'40px'}} value={promptParameter[0]} onChange={handleMyChange} name="promptParameter">
                  <option value='context'>context</option>
                  <option value='query'>query</option>
                </Form.Select>
              </div>
              <div >
                <input style={{width: `${getInputWidth(secondBox)}px`, paddingLeft:'5px'}}  className="input-field" name="second" value={secondBox} onChange={handleMyChange} />
              </div>
              <div >
                <input  style={{width: `${getInputWidth(promptParameter[1])}px`, paddingLeft:'5px'}} className="input-field" name="second" value={promptParameter[1]} />
              </div>
              <div >
                <input style={{width: `${getInputWidth(thirdBox)}px`, paddingLeft:'5px'}}  className="input-field" name="third" value={thirdBox} onChange={handleMyChange} />
              </div>
            </div>
            <div style={{fontSize:12}}>
              {completePrompt}
            </div>
          </div>
          </div>
        </div>


        <div className="form-group row">
          <label className="col-sm-4 ">Temperature: &nbsp;  {temperature}</label>
          <div className="col-sm-8">
            <input type="range" min={0} step={0.01} max={1} className="form-control-range" name="temperature" value={temperature} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 ">Number of Documents (K): &nbsp;  {k}</label>
          <div className="col-sm-8">
            <input type="range" step={1} min={0} max={20} className="form-control-range" name="k" value={k} onChange={handleInputChange} />
          </div>
        </div>


        <div className="form-group row">
          <label className="col-sm-4 ">Chunk Size:</label>
          <div className="col-sm-8">
            <input type="number" step={1} min={0} className="form-control" name="chunk_size" value={chunk_size} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 ">Chunk Overlap:</label>
          <div className="col-sm-8">
            <input type="number" min={0} step={1} className="form-control" name="chunk_overlap" value={chunk_overlap} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 ">System Message:</label>
          <div className="col-sm-8">
            <textarea className="form-control" name="system_message" value={system_message} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12 text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <button type="submit" className="btn btn-primary">Save Parameters</button>
            {/* {loading ?
             <div style={{marginLeft:'10px'}}>
            <LoadingIndicator />
            </div>
            : null} */}
          </div>

        </div>
      </form>

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
    </div>
  );
}

export default Config;