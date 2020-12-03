// Simple React Native specific changes
import { Platform } from 'react-native'

export default {
  // use 10.0.2.2 for Android to connect to host machine
  apiUrl: Platform.OS === 'ios' ? 'http://192.168.1.15:3000/' : 'http://192.168.1.15:3000/',
}
