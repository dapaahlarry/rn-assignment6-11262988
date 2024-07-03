import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Office Wear', price: 120, image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', price: 120, image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', price: 120, image: require('../assets/dress3.png') },
  { id: '4', name: 'Lameri', price: 120, image: require('../assets/dress4.png') },
  { id: '5', name: '2WWN', price: 120, image: require('../assets/dress5.png') },
  { id: '6', name: 'Lops', price: 120, image: require('../assets/dress6.png') },
  { id: '7', name: '2WWN White', price: 120, image: require('../assets/dress7.png') },
  { id: '8', name: 'Lame', price: 120, image: require('../assets/dress7.png') },
  // Add other products here
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const productExists = cart.some(item => item.id === product.id);
    if (!productExists) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/Search.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart', { cart })}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    height: 100, // Increase the height of the header
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -75 }],
    top: '50%', // Center vertically
    transform: [{ translateX: -75 }, { translateY: -25 }], // Adjust the values to center it properly
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: '50%', // Center vertically
    transform: [{ translateY: -15 }], // Adjust the value to center it properly
  },
  iconButton: {
    padding: 8,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  product: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

export default HomeScreen;
