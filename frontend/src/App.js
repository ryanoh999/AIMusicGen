import React, { useState } from 'react';
import WaveSurferComponent from './Components/Waveform'; // Assuming you rename the first component file to WaveSurferComponent.js
import logo from './Components/wavmakr-logo.png';
import {
    BsTrashFill,
    BsCloudUploadFill,
  } from "react-icons/bs";
//import { OrbitProgress } from 'react-loading-indicators'
import "./App.css"

function App() {
    const [textInput, setTextInput] = useState('');
    const [channels, setChannels] = useState([]);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const handleAddChannel = () => {
        const newChannelName = prompt('Enter the name of the new channel:');

        setChannels(prevChannels => [
            ...prevChannels,
            { name: newChannelName, file: '' }
        ]);
        /*if (newChannelName) {
            const filePath = prompt('Enter the file name of the WAV file (e.g., channel1.wav):');

            }
        }*/
    };

    const handleDeleteChannel = (index) => {
        setChannels(prevChannels => prevChannels.filter((channel, i) => i !== index));
    };

    const handleUpload = (index, uploadedFile) => {
        //const uploadedFile = event.target.files[0]; // Get the uploaded file
        const newChannels = [...channels]; // Create a copy of the channels array
        newChannels[index].file = URL.createObjectURL(uploadedFile); // Set the file property of the corresponding channel to the URL of the uploaded file
        setChannels(newChannels); // Update the state with the new channels array
    };
/*
    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('http://localhost:5000', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
*/
    const handleConcatenate = (index) => {
        // Implement concatenation logic here
    };

    const handlePlayAll = () => {
//
    };

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const textInputValue = document.getElementById('text_input').value;
            const form = new FormData();
            if (document.getElementById('wavinp')) {
                const files = document.getElementById('wavinp').files;
                for (let i = 0; i < files.length; i++) {
                    //let blob = await fetch(channel.file).then(r => r.blob());
                    form.append('audioInput', files[i]);
                };
            }
            form.append('textInput', textInputValue)
            console.log(form.get('textInput'))
            
            const response = await fetch('http://localhost:5000/generate', {
                method: 'POST',
                //textInput: textInputValue,
                body: form
            }); 
            if (response.ok) {
                // Parsing response blob
                const responseData = await response.blob();
                console.log(responseData)
            /*
            setChannels(prevChannels => [
                    ...prevChannels,
                    { name: 'Generated Audio', file: URL.createObjectURL(responseData) }
                ]);
            */
            const newChannel = { name: 'Generated Audio', file: URL.createObjectURL(responseData) };
        
            setChannels(prevChannels => [...prevChannels, newChannel]);
            console.log('Text input sent successfully');
            // Optionally, you can clear the text input after sending it
            setTextInput('');
            }    
        } catch (error) {
            console.error('Error sending text input:', error);
        } finally {
            setLoading(false); // Set loading back to false after request completes
            
    };
    }
    return (
        <div className="app-container" style={{ backgroundColor: 'lightblue' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'dodgerblue' }}>
        <div className="header">
            <img src={logo} alt="Logo" className="logo"/>
        </div>
        {loading && <div>Cooking...</div>}
            <label htmlFor="text_input">Enter a prompt (e.g. banjos strumming):</label>
            <form method="post">
                <input type="text" id="text_input" name="text_input" className='prompt'/>
            </form>
                <ul id="channels-list">
                    {channels.map((channel, index) => (
                        <li key={index}>
                            <h2>{channel.name}</h2>
                            <button className="transparent-button" onClick={() => handleDeleteChannel(index)}><BsTrashFill /></button>
                            <WaveSurferComponent url={channel.file} />
                            <div className="App">
                            <form method="post">
                                
                                <input type="file" id='wavinp' accept=".wav, .mp3" name='wav_input' onChange={(event) => handleUpload(index, event.target.files[0])} />
                                <img src={file} />
                            </form>
                            </div>
                            
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10%' }}>
                <button type="button" onClick={handleAddChannel}>Add Track</button>
                <button type="button" onClick={handleGenerate}>Generate</button>
                </div>
            
                </div>    
        </div>
    );
}

export default App;
//            <form action="/submit" method="post"> //</form>
//<input type="checkbox" id="{{ channel.name }}" name="selected_channels" value="{{ channel.name }}"/>