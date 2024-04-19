import React, { useState } from 'react';
import WaveSurferComponent from './Components/Waveform'; // Assuming you rename the first component file to WaveSurferComponent.js

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

    const handleConcatenate = (index) => {
        // Implement concatenation logic here
    };

    const handlePlayAll = () => {
//
    };

    return (
        <div>
            <h1>Result</h1>
            <label for="text_input">Text Input:</label>
            <input type="text" id="text_input" name="text_input" />

                <h2>Tracks</h2>
                <ul id="channels-list">
                    {channels.map((channel, index) => (
                        <li key={index}>
                            <input type="checkbox" id="{{ channel.name }}" name="selected_channels" value="{{ channel.name }}"/>

                            <WaveSurferComponent url={channel.file} />
                            <div className="App">
                                <h2> {channel.name} </h2>
                                <input type="file" accept=".wav, .mp3" onChange={(event) => handleUpload(index, event.target.files[0])} />
                                <img src={file} />
                            </div>
                            <button type="button" onClick={() => handleConcatenate(index)}>Loop</button>
                            <button type="button" onClick={() => handleDeleteChannel(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={handleAddChannel}>Add Track</button>
                <button type="button" onClick={handlePlayAll}>Play All</button>
                <button type="button" >Generate</button>
            
            
        </div>
    );
}

export default App;
//            <form action="/submit" method="post"> //</form>