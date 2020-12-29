import AsyncStorage from '@react-native-community/async-storage';

class ShoppingCartStorage {
  constructor(namespace = 'shoppingCart') {
    this.namespace = namespace;
  }

  async getProducts() {
    const rawProducts = await AsyncStorage.getItem(
      `${this.namespace}:products`
    );

    return rawProducts ? JSON.parse(rawProducts) : {};
  }

  async addProduct(productName, amount) {
    let currentProducts = await this.getProducts();
    if (currentProducts[productName]) {
      currentProducts[productName] += amount;
    } else {
      currentProducts[productName] = amount;
    }
    
    const newProducts = currentProducts;

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts)
    );
  }

  async clearProducts() {
    await AsyncStorage.removeItem(
      `${this.namespace}:products`
    );
  }
}

export default ShoppingCartStorage;