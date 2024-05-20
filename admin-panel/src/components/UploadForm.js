import React, { useState, useEffect, useRef, useCallback } from 'react';
import DELETEICON from '../assets/delete_icon.png'
import DOWNLOADICON from '../assets/download_icon.png'
import LoadingIndicator from './loadingIndicator';

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    setFiles(fileList);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      await fetch(`${appLocalizer.apiUrl}/upload/`, {
        method: 'POST',
        body: formData,
      })
        .then(() => {
          fetchUploadedFiles();
        })

    } catch (error) {
      console.error('Error uploading files: ', error);
    } finally {
      setFiles([]);
      setLoading(false)
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`${appLocalizer.apiUrl}/documents/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      console.log(data)
      setUploadedFiles(data);
    } catch (error) {
      console.error('Error fetching uploaded files: ', error);
    } finally {
      setLoading(false)
    }
  };

  const deleteFile = async (documentId) => {
    try {
      await fetch(`${appLocalizer.apiUrl}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        },
      });
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error deleting file: ', error);
    } finally {
      setLoading(false)
    }
  };

  const downloadFile = async (documentId) => {
    try {
      const response = await fetch(`${appLocalizer.apiUrl}/documents/${documentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentId);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file: ', error);
    } finally {
      setLoading(false)
    }
  };

  const RenderSelectedFiles = useCallback(() => {

    return (
      files.length > 0 && (
        <div style={{ overflow: 'hidden', border: '1px solid', borderColor: '#CCCCCC', borderRadius: '5px', marginBottom:'15px' }}>
          <div className='bg-primary' style={{ color: 'white', padding: '10px' }}>
            <label style={{ fontSize: '18px', fontWeight: 600, margin: '0px' }}>Selected Files</label>
          </div>
          <div style={{}}>
            {files.map((file, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E8E8E8', padding: '10px', margin: '0px', fontSize: '14px' }}>
                {file.name}
                <div>
                  <button type="button" class="btn btn-outline-light" style={{ border: '0px' }} onClick={() => {
                    removeFile(index)
                  }}>
                    <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DELETEICON}></img>
                  </button>
                </div>
              </li>
            ))}
          </div>
        </div>

        // <div className="mb-4">
        //   <label style={{ marginTop: '10px' }} for="formFileMultiple" class="form-label">Selected Files</label>
        //   <ul className="list-group">
        //     {files.map((file, index) => (
        //       <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
        //         <span>{file.name}</span>
        //         <button type="button" class="btn btn-outline-light" onClick={() => removeFile(index)} >
        //           <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DELETEICON}></img>
        //         </button>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      )
    )
  }, [files])

  const RenderUploadedFiles = useCallback(() => {

    return (
      uploadedFiles.length != 0
        ?
        // <Card style={{ width: '100%', padding:'0px' }}>
        //   <Card.Header style={{backgroundColor:'blue', color:'white'}}>Uploaded Files</Card.Header>
        //   <ListGroup variant="flush">
        //     {uploadedFiles.map((documentId, index) => (
        //       <ListGroup.Item style={{paddingRight:'0px', paddingLeft:'0px'}}>
        //         <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{borderRight:'0px', borderLeft:'0px'}}>
        //           {documentId}
        //           <div>
        //             <button type="button" class="btn btn-outline-light" onClick={() => {
        //               setLoading(true)
        //               deleteFile(documentId)
        //             }}>
        //               <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DELETEICON}></img>
        //             </button>
        //             <button onClick={() => {
        //               setLoading(true)
        //               downloadFile(documentId)
        //             }} type="button" class="btn btn-outline-light">
        //               <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DOWNLOADICON}></img>
        //             </button>
        //           </div>
        //         </li>
        //       </ListGroup.Item>
        //     ))}
        //   </ListGroup>
        // </Card>

        <div style={{ overflow: 'hidden', border: '1px solid', borderColor: '#cccccc', borderRadius: '5px' }}>
          <div className='bg-primary' style={{ color: 'white', padding: '10px' }}>
            <label style={{ fontSize: '18px', fontWeight: 600, margin: '0px' }}>Old Files</label>
          </div>
          <div style={{}}>
            {uploadedFiles.map((documentId, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E8E8E8', padding: '10px', margin: '0px', fontSize: '14px' }}>
                {documentId}
                <div>
                  <button type="button" class="btn btn-outline-light" style={{ border: '0px' }} onClick={() => {
                    setLoading(true)
                    deleteFile(documentId)
                  }}>
                    <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DELETEICON}></img>
                  </button>
                  <button onClick={() => {
                    setLoading(true)
                    downloadFile(documentId)
                  }} type="button" class="btn btn-outline-light" style={{ border: '0px' }}>
                    <img style={{ height: '20px', width: '20px', resize: 'block' }} src={DOWNLOADICON}></img>
                  </button>
                </div>
              </li>
            ))}
          </div>
        </div>

        : null
    )
  }, [uploadedFiles])

  return (
    <div style={{ width: '70vw', marginTop: '20px' }}>

      <h3>File Manager</h3>
      <hr class="hr" />

      <div class="form-group" style={{ width: '50vw' }}>
        <label >Upload files</label>
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="exampleInputFile" multiple onChange={handleFileChange} />
            <label class="custom-file-label" >Choose file</label>
          </div>
          <div class="input-group-append hover">
            <span onClick={() => {
              setLoading(true)
              uploadFiles()
            }} class="input-group-text">Upload</span>
          </div>
        </div>
      </div>

      <RenderSelectedFiles />

      <RenderUploadedFiles />

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
};

export default UploadForm;
