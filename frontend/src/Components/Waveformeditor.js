import React, { useState } from 'react';
import MyWaveform from './MyWaveform'; // Assuming MyWaveform.js is in the same directory

const WaveformEditor = ({ wavFiles }) => {
  const [playing, setPlaying] = useState(false);

  const handleTogglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      {wavFiles.map((wavFile, index) => (
        <div key={index}>
          <h2>Channel {index + 1}</h2>
          <MyWaveform audioFile={wavFile} playing={playing} />
        </div>
      ))}
      <button onClick={handleTogglePlay}>{playing ? 'Pause All' : 'Play All'}</button>
    </div>
  );
};

export default WaveformEditor;
