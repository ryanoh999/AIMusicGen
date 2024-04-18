import React, { useState } from "react";
import { CircleIconButton } from "playbook-ui";
import Wavesurfer from "react-wavesurfer";

const MyWaveform = ({ audioFile, playing }) => {
  const [pos, setPos] = useState(0);

  const handleTogglePlay = () => {
    // Handle play/pause
  };

  const handlePosChange = (e) => {
    setPos(e.originalArgs[0]);
  };

  const waveOptions = {
    barGap: 15,
    height: 200,
    progressColor: "#0056CF",
    waveColor: "#C1CDD6",
    normalize: true,
    barWidth: 3,
    barRadius: 3
  };

  return (
    <div>
      <Wavesurfer
        audioFile={audioFile}
        pos={pos}
        onPosChange={handlePosChange}
        playing={playing}
        options={waveOptions}
      />

      <CircleIconButton
        icon={playing ? "pause" : "play"}
        onClick={handleTogglePlay}
        variant={"secondary"}
      />
    </div>
  );
};

export default MyWaveform;
