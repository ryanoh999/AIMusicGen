import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";
import '../App.css';

const WaveSurferComponent = ({ url }) => {
    const waveformRef = useRef(null);
    let wavesurfer;
    const [playPause, setPlayPause] = useState();
    //const [textInput, setTextInput] = useState('');
    //const [channels, setChannels] = useState([]);


    useEffect(() => {
      if (url) {
        wavesurfer = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#34374B",
          progressColor: "#F90",
          url: url,
          dragToSeek: true,
          //width: "35vw",
          hideScrollbar: true,
          //normalize: true,
          barGap: 1,
          height: 60,
          barHeight: 3,
          barRadius: 100,
          barWidth: 3,
        });

        wavesurfer.on("finish", () => {
          console.log("song finished");
        });

        wavesurfer.on("ready", () => {
          console.log("Waveform is ready");
        });

        return () => {
          if (wavesurfer) {
            wavesurfer.destroy();
          }
        };
      }
  }, [url]);

  
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

        <div ref={waveformRef} className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button className="transparent-button" type="button" onClick={handleSkipBack}>
            <BsSkipBackward />
          </button>
          <button className="transparent-button" type="button" onClick={handlePause}>
            <BsFillPlayFill />
          </button>
          <button className="transparent-button" type="button" onClick={handleStop}>
            <BsFillStopFill />
          </button>
          <button className="transparent-button" type="button" onClick={handleSkipForward}>
            <BsSkipForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaveSurferComponent;