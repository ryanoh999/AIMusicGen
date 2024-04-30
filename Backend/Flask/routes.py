from flask import Flask, request, send_from_directory, send_file, Response
import wave
import soundfile
import urllib.request
import requests
import io
from gen_functions import *

from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CONTENT_TYPE'] = 'multipart/form-data'

model = load_model()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/generate', methods=['POST'])
def generate_text():
    if request.method == 'POST':
        files = request.files.getlist('audioInput')
        text = request.form.get('textInput')
        print(text)
        for file in files:
            wave_object = wave.open(file, 'rb')
            nchannels = wave_object.getnchannels()
            sampwidth = wave_object.getsampwidth()
            framerate = wave_object.getframerate()
            nframes = wave_object.getnframes()
            comptype = wave_object.getcomptype()
            compname = wave_object.getcompname()
            
            # Creating a bytes buffer
            output_buffer = io.BytesIO()

            # Creating a new wave file for writing to the buffer
            output_wave_file = wave.open(output_buffer, 'w')
            
            nchannels = wave_object.getnchannels()
            sampwidth = wave_object.getsampwidth()
            framerate = wave_object.getframerate()
            nframes = wave_object.getnframes()
            comptype = wave_object.getcomptype()
            compname = wave_object.getcompname()

            # Creating a new wave file for writing
            output_wave_file = wave.open('output.wav', 'w')

            # Setting parameters for the output wave file
            output_wave_file.setnchannels(nchannels)
            output_wave_file.setsampwidth(sampwidth)
            output_wave_file.setframerate(framerate)
            output_wave_file.setnframes(nframes)
            output_wave_file.setcomptype(comptype, compname)

            # Writing data from the wave_open object to the output wave file
            output_wave_file.writeframes(wave_object.readframes(nframes))

            # Closing both files
            wave_object.close()

        generate(model, [text], out_path='./outputs/file', melody=output_wave_file)
        with wave.open('./outputs/file', 'rb') as wav_file:
            blob = wav_file.readframes(wav_file.getnframes())
        output_wave_file.close()
        #data = request.json
        #text_input = data.get('textInput')
        #generate(text, files)
        print('Received text input:', text)

        return Response(blob, mimetype='application/octet-stream')
        # Optionally, you can return a response to the client
        #return send_file('output.wav', mimetype='audio/wav')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
