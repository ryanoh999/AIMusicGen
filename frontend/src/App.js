import React, { useState } from 'react';
import WaveSurferComponent from './Components/Waveform'; // Assuming you rename the first component file to WaveSurferComponent.js

function App() {
    const [textInput, setTextInput] = useState('');
    const [channels, setChannels] = useState([]);

    const handleAddChannel = () => {
        const newChannelName = prompt('Enter the name of the new channel:');
        if (newChannelName) {
            const filePath = prompt('Enter the file name of the WAV file (e.g., channel1.wav):');
            if (filePath) {
                setChannels(prevChannels => [
                    ...prevChannels,
                    { name: newChannelName, file: '/wav_files/' + filePath }
                ]);
            }
        }
    };

    const handleDeleteChannel = (index) => {
        setChannels(prevChannels => prevChannels.filter((channel, i) => i !== index));
    };

    const handleConcatenate = (index) => {
        // Implement concatenation logic here
    };

    const handlePlayAll = () => {
        // Implement play all logic here
    };

    return (
        <div>
            <h1>Result</h1>
            <p>Text Input: {textInput}</p>

                <h2>Channels</h2>
                <ul id="channels-list">
                    {channels.map((channel, index) => (
                        <li key={index}>
                            <WaveSurferComponent url={channel.file} />
                            <button type="button" onClick={() => handleConcatenate(index)}>Concatenate</button>
                            <button type="button" onClick={() => handleDeleteChannel(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={handleAddChannel}>Add Channel</button>
                <button type="button" onClick={handlePlayAll}>Play All</button>
                <input type="submit" value="Submit" />
            
            
        </div>
    );
}

export default App;
//            <form action="/submit" method="post"> //</form>