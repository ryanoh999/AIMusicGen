#!/bin/bash

sudo apt update && sudo apt upgrade

sudo apt install ffmpeg

sudo apt install python3

sudo apt install python3-pip

sudo apt install python3-venv

sudo apt install git-all

echo 'python installed'

python3 -m venv mg_env

source mg_env/bin/activate

echo 'venv created and activated'

curl https://raw.githubusercontent.com/GoogleCloudPlatform/compute-gpu-installation/main/linux/install_gpu_driver.py --output install_gpu_driver.py

sudo python3 install_gpu_driver.py

pip3 install -r requirements.txt

sudo apt install npm

cd ../frontend

npm i

npm install axios

npm install react-icons

npm install wavesurfer.js

npm run build

echo 'dependencies installed'

cd ../Backend/Flask

python3 routes.py
