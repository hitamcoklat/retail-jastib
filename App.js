import React from 'react'
import RouterApp from './src/router'

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux/configureStore'
const { store, persistor } = configureStore();

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RouterApp />
        </NavigationContainer>   
      </PersistGate>   
    </Provider>
  )
}

export default App;