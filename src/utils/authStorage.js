// Exercise 10.14: storing the access token step1
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;  
  }

  async getAccessToken() {
    const key = `${this.namespace}:accessToken`;  
    const token = await AsyncStorage.getItem(key);
    return token;  
  }

  async setAccessToken(accessToken) {
    const key = `${this.namespace}:accessToken`;
    await AsyncStorage.setItem(key, accessToken);  
  }

  // Exercise 10.16: sign out
  async removeAccessToken() {
    const key = `${this.namespace}:accessToken`;
    await AsyncStorage.removeItem(key);
  }
}

export default AuthStorage;