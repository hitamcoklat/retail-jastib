import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

Reactotron
    .configure({ host: '192.168.1.10' }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .setAsyncStorageHandler(AsyncStorage) // <- here!
    .connect() // let's connect!