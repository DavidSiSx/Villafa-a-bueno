// screens/GuestDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

// Define la URL base (reemplaza <YOUR_SERVER_IP> según corresponda)
const BASE_URL = 'http://localhost:3000';

export default function GuestDetailScreen({ route }) {
  const { guestId } = route.params;
  const [guest, setGuest] = useState(null);
  const [numPersons, setNumPersons] = useState('');
  const [extraName, setExtraName] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchGuestDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/invitados/${guestId}`);
      setGuest(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del invitado:', error);
    }
  };

  useEffect(() => {
    fetchGuestDetails();
  }, [guestId, refresh]);

  const handleConfirm = async () => {
    try {
      await axios.post(
        `${BASE_URL}/invitados/${guestId}/confirm`,
        { num_personas: parseInt(numPersons, 10) }
      );
      Alert.alert('Confirmado', 'La asistencia ha sido confirmada');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al confirmar asistencia:', error);
    }
  };

  const handleAddExtra = async () => {
    try {
      await axios.post(
        `${BASE_URL}/invitados/${guestId}/extra`,
        { nombre: extraName }
      );
      Alert.alert('Extra Agregado', 'Se ha agregado el invitado extra');
      setExtraName('');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al agregar invitado extra:', error);
    }
  };

  if (!guest) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{guest.nombre}</Text>
      <Text>Teléfono: {guest.telefono}</Text>
      <Text>Número de personas confirmadas: {guest.num_personas}</Text>

      <Text style={styles.sectionTitle}>Confirmar Asistencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de personas"
        value={numPersons}
        onChangeText={setNumPersons}
        keyboardType="numeric"
      />
      <Button title="Confirmar" onPress={handleConfirm} />

      <Text style={styles.sectionTitle}>Agregar Invitado Extra</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del invitado extra"
        value={extraName}
        onChangeText={setExtraName}
      />
      <Button title="Agregar Extra" onPress={handleAddExtra} />

      <Text style={styles.sectionTitle}>Invitados Extra</Text>
      {guest.extras && guest.extras.length > 0 ? (
        <FlatList
          data={guest.extras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.extraItem}>
              <Text>{item.nombre}</Text>
              {/* Puedes agregar botones para actualizar o eliminar el invitado extra */}
            </View>
          )}
        />
      ) : (
        <Text>No hay invitados extra.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  extraItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
