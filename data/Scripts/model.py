from pandas import read_csv
from keras.models import Sequential
from keras.layers import Dense

# loads the dataset
dataset = read_csv('datapoints.csv', encoding='latin1')
snowday_data = dataset['Snowday?']
weather_data = dataset.drop('Snowday?', 1).drop('Snow on Grnd (cm)', 1).drop('Cool Deg Days (°C)', 1).drop('Heat Deg Days (°C)', 1).drop('Mean Temp (°C)', 1)

# define the keras model
model = Sequential()
model.add(Dense(14, input_dim=5, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# compile the keras model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# fit the keras model on the dataset
model.fit(weather_data, snowday_data, epochs=100, batch_size=10)

# evaluate the keras model
_, accuracy = model.evaluate(weather_data, snowday_data)
print('Accuracy: %.2f' % (accuracy*100))