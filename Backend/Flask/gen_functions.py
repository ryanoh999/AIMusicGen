# for model
import torchaudio
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

# for mix_and_play_wav_files
from pydub import AudioSegment
from pydub.playback import play


def mix_and_play_wav_files(file_paths, volumes=None, loops=None, offsets=None):
    """
    Args:
        file_paths (list of paths): file_paths of .wav files
        volumes (list of int): (optional) volumes per file
        loops (list of int): (optional) num loops per file
        offsets (list of int): (optional) how long to wait (ms) before playing each file

    """
    mixed = None

    for i, file_path in enumerate(file_paths):
        sound = AudioSegment.from_wav(file_path)
        duration = len(sound) / 1000.0
        
        # volume adjustment
        if volumes and i < len(volumes):
            sound += volumes[i]  # Adjust volume in dB
        
        # looping
        if loops and i < len(loops):
            sound *= loops[i]  # Repeat sound
        
        # position of sound
        position = 0
        if offsets and i < len(offsets):
            position = offsets[i]
        
        # overlay the sound at specified position
        if mixed is None:
            mixed = sound
        else:
            # extend track if necessary
            if position + len(sound) > len(mixed):
                mixed += AudioSegment.silent(duration=(position + len(sound) - len(mixed)))
            
            mixed = mixed.overlay(sound, position=position)

    # play audio
    if mixed:
        play(mixed)


def load_model():
    """
    Returns:
        model (audiocraft class): audiocrafts MusicGen melody model
    """
    model = MusicGen.get_pretrained('melody')
    return model


def generate(model, descriptions:list, out_path:str, melody=None, length=5):
    """

    
    Args:
        model (torchaudio model): 
        descriptions (list of str): List of prompt inputs into model
        out_path (str): path to write .wav out files
        melody (.wav or .mp3 file): Melody to input into models
        length (int): length of output in seconds

    Returns:
        None ==> writes file to <out_path>_<idx>.wav
    """
    sr = 44100
    model.set_generation_params(duration=length)

    if melody:
        melody, sr = torchaudio.load(melody)
        wav = model.generate_with_chroma(descriptions, melody[None], sr)
    else:
        wav = model.generate(descriptions, sr)
    
    for idx, one_wav in enumerate(wav):
        audio_write(f'{out_path}_{idx}', one_wav.cpu(), sr, strategy="loudness")
