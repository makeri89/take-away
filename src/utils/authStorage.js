import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );

    return accessToken;
  }

  async setToken(token) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      token
    ); 
  }

  async removeToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:token`
    );
  }
}

export default AuthStorage;