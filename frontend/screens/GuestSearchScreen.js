// screens/GuestSearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function GuestSearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [guests, setGuests] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/invitados?nombre=${search}`
      );
      setGuests(response.data);
    } catch (error) {
      console.error('Error al buscar invitado:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('GuestDetail', { guestId: item.id })}
    >
      <Text style={styles.itemText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Buscar Invitado:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: { fontSize: 16 },
});
