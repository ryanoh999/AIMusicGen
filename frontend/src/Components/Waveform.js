import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";

export default function App() {
  const waveformRef = useRef(null);
  let wavesurfer;
  const [playPause, setPlayPause] = useState();
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

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#34374B",
      progressColor: "#F90",
      url: "/wav_files/Hako sample.wav",
      dragToSeek: true,
      width: "35vw",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      //barHeight: 20,
      barRadius: 20,
      barWidth: 3,
    });

    wavesurfer.on("finish", () => {
      console.log("song finished");
    });

    wavesurfer.on("ready", () => {
      console.log("Waveform is ready");
    });
    return () => {
      wavesurfer.destroy();
    };
  }, []);
  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  };
  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(2);
    }
  };
  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-2);
    }
  };

  return (
    
    <div className="container">
      <div className="sub-container">
        <p>Oceans</p>

        <div ref={waveformRef} className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button onClick={handleSkipBack}>
            <BsSkipBackward />
          </button>
          <button onClick={handlePause}>
            <BsFillPlayFill />
          </button>
          <button onClick={handleStop}>
            <BsFillStopFill />
          </button>
          <button onClick={handleSkipForward}>
            <BsSkipForward />
          </button>
        </div>
      </div>
    </div>
  );
}