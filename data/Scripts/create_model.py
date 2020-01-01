from pandas import read_csv
from keras.models import Sequential
from keras.layers import Dense

# loads the dataset
dataset = read_csv('datapoints.csv', encoding='latin1')
snowday_data = dataset['Snowday?']
weather_data = dataset.drop(
    ['Snowday?', 'Snow on Grnd (cm)', 'Cool Deg Days (°C)', 'Heat Deg Days (°C)', 'Mean Temp (°C)'], axis=1)

print(weather_data)

# define the keras model
model = Sequential()
model.add(Dense(5, input_dim=5, activation='relu'))
model.add(Dense(11, input_dim=5, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# compile the keras model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# fit the keras model on the dataset
model.fit(weather_data, snowday_data, epochs=200, batch_size=100)

# evaluate the keras model
_, accuracy = model.evaluate(weather_data, snowday_data)
print('Accuracy: %.2f' % (accuracy*100))

# save the keras model to file
model.save('model.h5')
