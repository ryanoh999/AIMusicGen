from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

# Define the directory where your WAV files are located 
WAV_DIR = "static/wav_files"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():

    # Retrieve the text input from the form
    text_input = request.form['text_input']

    # Assuming you have three channels, you can name them channel1.wav, channel2.wav, and channel3.wav
    # You can replace these names with your actual WAV files
    channels = [
        {'name': 'Channel 1', 'file': 'flute sample low pitch.wav'},
        {'name': 'Channel 2', 'file': 'Hako sample.wav'},
        {'name': 'Channel 3', 'file': 'pierre hawk.wav'}
    ]
 
    return render_template('result.html', text_input=text_input, channels=channels)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
