import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const waveSurferRef = useRef(null);

useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
        container: '#waveform-container',
        waveColor: 'rgba(0, 0, 0, 0.2)',
        progressColor: 'rgba(0, 0, 0, 0.5)',
        cursorWidth: 1,
        cursorColor: '#333',
        barWidth: 1,
        barRadius: 2,
        responsive: true,
        height: 100,
    });

    return () => {
        waveSurferRef.current.destroy();
    };
}, []);


