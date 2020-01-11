# Data
Trains model to predict snowday probabilities.

## Installation
1. Open terminal in this folder (data)
1. Install `python3-pip`
1. `pip3 install virtualenv` (Requires root access)
1. `virtualenv venv`
1. `source venv/bin/activate`
1. `pip3 install -r requirements.txt`
1. If setting up in PyCharm select use `venv` as the virtual environment

## Training
Alternatively, run from PyCharm
1. `source venv/bin/activate` (if not already)
1. Switch to the `Scripts` directory
1. Run `python3 create_model.py`

## Validation
Alternatively, run from PyCharm
1. `source venv/bin/activate` (if not already)
1. Switch to the `Scripts` directory
1. Run `python3 predict.py`

## Deploying
1. Run the training
1. Switch to the base directory (data)
1. Run `tensorflowjs_converter --input_format keras Scripts/model.h5 Scripts`
1. Copy `model.json` and `group1-shard1of1.bin` from the `Scripts` folder to the `backend` folder
1. Follow deployment steps in `backend`