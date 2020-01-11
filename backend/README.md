# Backend
AWS Lambda function to get weather information from location, and use neural network to predict the probability of a snowday.

## Installation
1. If not already, install npm
1. In this folder (backend folder) run `npm install`

## Development Testing
It is possible to modify the project to support offline testing. An alternative method is to copy most of the contents of `index.js` to a NodeJS server that has `apollo-server`, and test with that.

## Deploying
1. Add all files in this folder (backend folder) to a zip file (e.g. `zip -r function.zip .` on Ubuntu)
1. Upload the zip file to AWS Lambda