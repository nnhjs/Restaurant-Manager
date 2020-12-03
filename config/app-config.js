// Simple React Native specific changes
import { Platform } from 'react-native'

export default {
  // use 10.0.2.2 for Android to connect to host machine
  apiUrl: Platform.OS === 'ios' ? 'http://172.20.10.2:3000/' : 'http://172.20.10.2:3000/',
}
