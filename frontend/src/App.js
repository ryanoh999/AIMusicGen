import React, { useState } from 'react';
import WaveSurferComponent from './Components/Waveform'; // Assuming you rename the first component file to WaveSurferComponent.js
import axios from 'axios';


function App() {
    const [textInput, setTextInput] = useState('');
    const [channels, setChannels] = useState([]);
    const [file, setFile] = useState();

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
            const textInputValue = document.getElementById('text_input').value;
            const form = new FormData();
            const files = document.getElementById('wavinp').files;
            for (let i = 0; i < files.length; i++) {
                //let blob = await fetch(channel.file).then(r => r.blob());
                form.append('audioInput', files[i]);
            };
            form.append('textInput', textInputValue)
            console.log(form.get('textInput'))
            
            const response = await fetch('http://0.0.0.0:5000/generate', {
                method: 'POST',
                //textInput: textInputValue,
                body: form
            }); 
            if (response.ok) {
                // Parsing response blob
                const responseData = await response.blob();
            setChannels(prevChannels => [
                    ...prevChannels,
                    { name: 'Generated Audio', file: URL.createObjectURL(responseData) }
                ]);
            console.log('Text input sent successfully');
            // Optionally, you can clear the text input after sending it
            setTextInput('');
            }    
        } catch (error) {
            console.error('Error sending text input:', error);
        
    };
    }
    return (
        <div>
            <h1>WavMakr v0.0.1 (in development)</h1>
            <label htmlFor="text_input">Text Input:</label>
            <form method="post">
                <input type="text" id="text_input" name="text_input" />
            </form>
                <h2>Tracks</h2>
                <ul id="channels-list">
                    {channels.map((channel, index) => (
                        <li key={index}>
                            <input type="checkbox" id="{{ channel.name }}" name="selected_channels" value="{{ channel.name }}"/>

                            <WaveSurferComponent url={channel.file} />
                            <div className="App">
                            <form method="post">
                                <h2>{channel.name}</h2>
                                <input type="file" id='wavinp' accept=".wav, .mp3" name='wav_input' onChange={(event) => handleUpload(index, event.target.files[0])} />
                                <img src={file} />
                            </form>
                            </div>
                            <button type="button" onClick={() => handleDeleteChannel(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={handleAddChannel}>Add Track</button>
                <button type="button" onClick={handlePlayAll}>Play All</button>
                <button type="button" onClick={handleGenerate}>Generate</button>
            
            
        </div>
    );
}

export default App;
//            <form action="/submit" method="post"> //</form>