# Snowday Predictor

Calculates the percent probability of a snowday (school is cancelled or busses aren't running). To see it in action visit [snowdaypredictor.net](https://www.snowdaypredictor.net)

## Project Structure
Each folder has a sub-project that has its own instructions for running, building and deploying.

### Backend
Designed to run in AWS Lambda. Checks weather at given location, and uses pretrained model to predict chance of a snowday.

### Data
Historical weather and snowday announcements used to train model that can be used by the backend.

### Frontend
User-facing web page that gets the location the user wants to check, and retrieves the snowday probabilities from the backend.
