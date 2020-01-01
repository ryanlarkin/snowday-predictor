from keras.models import load_model
from numpy import array

def predict_snowday(max_temp, min_temp, total_rain, total_snow, total_precip):
    model = load_model('model.h5')
    prediction = model.predict(array([[max_temp, min_temp, total_rain, total_snow, total_precip]]))[0][0]

    return prediction

